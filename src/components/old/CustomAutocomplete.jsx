import React, { useState, useRef, useEffect } from 'react';
import './CustomAutocomplete.css';

const suggestions = [
  'Apple','application','apply', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Lemon', 'Mango', 'Orange', 'Pineapple', 'Strawberry'
];

function CustomAutocomplete() {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // 変更: ハイライトされた提案のインデックスを追加
  const inputRef = useRef();

  useEffect(() => {
    // 変更: クリック以外の方法で提案が選択されたときにハイライトをリセット
    setHighlightedIndex(-1);
  }, [showSuggestions]);

  const updateInputValue = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const lastWord = value.split(/[\s　]+/).pop();
    if (lastWord.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    const words = inputValue.split(/[\s　]+/);
    words[words.length - 1] = suggestion;
    setInputValue(words.join(' ') + ' ');
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    // 変更: キーボードイベントを処理
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
			<input
				type="text"
				value={inputValue}
				onChange={updateInputValue}
				onKeyDown={handleKeyDown} // 変更: キーボードイベントを追加
				ref={inputRef}
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
		</div>
	);
}

export default CustomAutocomplete;
