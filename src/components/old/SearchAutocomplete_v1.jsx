import React, { useState, useRef, useEffect } from 'react';
import styled from "@emotion/styled";
import axios from 'axios';
import {AiOutlinePlus} from 'react-icons/ai';
import './SearchAutocomplete.css';


let suggestions = [
  'Apple','application','apply', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Lemon', 'Mango', 'Orange', 'Pineapple', 'Strawberry'
];
axios.get('https://woxram-api.com/search/getnamelist/')
  .then(function (response) {
      suggestions=response.data;
})

const RoundedInput = styled("input")({
    borderRadius: "50px",
    padding: "8px",
    paddingLeft: "20px",
    paddingRight: "10px",
    width: "75%",
    fontSize: "16px",
    '&:focus': {
      outline: "none",
    },
    // 下と上は同じ意味だが下はstyledでは動かない
    // input:focus {
    //     outline: none;
    // }
});

function SearchAutocomplete(props) {
  // 半角、全角スペースで区切る
  const splitRegex=/[\s　]+/;
  // 半角、全角スペース+@で区切る
  const splitRegexAt=/[\s\u3000]@?/

  const regexAlphanumeric = /^[A-Za-z0-9!-/:-@\[-`{-~]+$/;

  const [inputValue, setInputValue] = useState(props.firstKeyword);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // 変更: ハイライトされた提案のインデックスを追加
  const inputRef = useRef();

  useEffect(() => {
    // 変更: クリック以外の方法で提案が選択されたときにハイライトをリセット
    setHighlightedIndex(-1);
  }, [showSuggestions]);

  const updateInputValueEnNum = (event) => {
    console.log('updateInputValueEnNum')
    const value = event.target.value;
    setInputValue(value);
    props.setSearchKeyword(value); // 変更: 親コンポーネントに入力値を渡す

    // const lastWord = value.split(splitRegexAt).pop();
    const lastWord = ((value.split(splitRegexAt)).length===1)? value.split('@').pop() : value.split(splitRegexAt).pop();

    if(regexAlphanumeric.test(lastWord)){
      if (lastWord.length > 1) {
        const filtered = suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(lastWord.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const updateInputValueJa = (event) => {
    console.log('updateInputValueJa');
    const value = event.target.value;
    setInputValue(value);
    props.setSearchKeyword(value); // 変更: 親コンポーネントに入力値を渡す

    // const lastWord = value.split(splitRegexAt).pop();
    const lastWord = ((value.split(splitRegexAt)).length===1)? value.split('@').pop() : value.split(splitRegexAt).pop();
    console.log(value.split(splitRegexAt))
    console.log(lastWord);
    if (lastWord.length > 1) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(lastWord.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    const words = inputValue.split(splitRegex);
  
    words[words.length - 1] = '@'+suggestion;
    setInputValue(words.join(' ') + ' ');
    props.setSearchKeyword(words.join(' ') + ' '); // 変更: 親コンポーネントに入力値を渡す
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };
  // 変更: フォーカスが当たったときに入力候補リストを表示する関数を追加
  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
    switch (event.key) {
        case "Enter":
            console.log('Enter key pressed from input');
            props.setTrueIssearch();
            break;
    }

    // 変更: キーボードイベントを処理 サジェストリストをの上下キーで選択できるようにする
    if (showSuggestions) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev <= 0 ? 0 : prev - 1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev >= filteredSuggestions.length - 1 ? prev : prev + 1));
      } else if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        if (highlightedIndex !== -1) {
          selectSuggestion(filteredSuggestions[highlightedIndex]);
        }
      }
    }
  };

  return (
   	<div className="custom-autocomplete">
      <div className="input-container">
        <RoundedInput
          type="text"
          value={inputValue}
          onInput={updateInputValueEnNum}
          onCompositionEnd={updateInputValueJa}
          onKeyDown={handleKeyDown} // 変更: キーボードイベントを追加
          ref={inputRef}
          onBlur={handleBlur} // 変更: onBlurイベントハンドラを追加
          onFocus={handleFocus} // 変更: onFocusイベントハンドラを追加
        />
        
        {showSuggestions && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className={highlightedIndex === index ? 'highlighted' : ''} // 変更
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div><AiOutlinePlus style={{margin:"7px"}} onClick={props.toggleDetailOpened}  size={20}/></div>
      </div>
	</div>
	);
}

export default SearchAutocomplete;