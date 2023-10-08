import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';


import { Grid, Checkbox} from '@mui/material';
import {FormControl, Select, MenuItem, InputLabel} from '@mui/material';
import { Tooltip, IconButton } from "@mui/material";
import { AiOutlineSearch, AiFillQuestionCircle} from 'react-icons/ai';

import SearchAutocomplete from "../SearchAutocomplete_v2";
import CheckVersion from "../CheckVersion";

import './SearchMenu.css';

import useCustomEffect from '../hooks/useCustomEffect';

const SearchButton = styled(Button)({
    width:"50%",
    borderRadius:"50px",
    margin:"20px",
    '@media (max-width: 768px)': {
        width:"65%",
    },
});

const SearchMenu = (props) => {
    // APIの呼び出し
    const getWoxramAPI = () => {
        console.log("getWoxramAPI");
        props.setLoading(true);
        // axios.get('http://133.130.96.237/dnbapi/woxsimulation/')
        axios.get('https://woxram.com/django/api/woxramsearch2/',
            // {params: {keyword:query.get("keyword"), order:query.get("order"), sample:query.get("sample"), dlsite:query.get("dlsite"),page:query.get("page")}}
            {params: {keyword:searchKeyword, sample:isSample?'on':'' , dlsite:isDlsite?'on':'' , order:selectedOrderValue, page:page }}
        )
        .then(function (response) {
                const result = JSON.stringify(response.data);
                props.setLoading(false);
                setIsSearch(false);
                setPage(1);
                props.showResult(result);
                
        })
        .catch(function (error) {
                console.log(error);
        });
    };
    const getWoxramAPIMemo = () => {
        console.log("getWoxramAPIMemo");
        props.setLoading(true);
        axios.get('https://woxram.com/django/api/woxramsearch2/',
            {params: {memo:memo}}
        )
        .then(function (response) {
                const result = JSON.stringify(response.data);
                props.setLoading(false);
                setIsSearch(false);
                setPage(1);
                props.showResult(result);
                
        })
        .catch(function (error) {
                console.log(error);
        });
    };
    // クエリパラメータを取得
    let firststateSample=true;
    let firststateDlsite=false;
    let firstKeyword="";
    let firstorder=2;
    let firstmemo="";
    // let page=query.get("page")?Number(query.get("page")):1;
    const search=useLocation().search;
    const query=new URLSearchParams(search);

    if(query.get("keyword")!==null){
        // クエリパラメータがある場合はそれを初期値とする
        firstKeyword=query.get("keyword");
        if(query.get("sample")==='on'){
            firststateSample=true;
        }else{
            firststateSample=false;
        }
        if(query.get("dlsite")==='on'){
            firststateDlsite=true;
        }else{
            firststateDlsite=false;
        }
        if(query.get("order")!==null){
            firstorder=Number(query.get("order"));
        };
    }
    if(query.get("memo")!==null){
        firstmemo=query.get("memo");
    };

    // 初回レンダリング時にクエリパラメータにkeywordがある場合は検索APIを呼び出す
    const initProcess = () => {
        if(query.get("keyword")!==null){
            getWoxramAPI();
        }else if(query.get("memo")!==null){
            getWoxramAPIMemo();
        }
    };
    useEffect(initProcess, []);


    // チェックボックス、セレクトボックスのデフォルト値を設定
    const [isSample, setIsSample] = useState(firststateSample);
    const [isDlsite, setIsDlsite] = useState(firststateDlsite);
    const [isXjoin, setIsXjoin] = useState(true);
    const [page, setPage] = useState(query.get("page")?Number(query.get("page")):1);
    const [searchKeyword, setSearchKeyword] = useState(firstKeyword);
    const [memo, setMemo] = useState(firstmemo);

    const [selectedOrderValue, setSelectedOrderValue] = useState(firstorder);
    const handleChange = (e) => {
        console.log(e.target.value)
        setSelectedOrderValue(e.target.value);
    };

    // クエリパラメータをURLにセットする関数
    const navigate = useNavigate();
    const setQueryParam = (key,value) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(key, value);
        navigate('/?'+queryParams.toString());
    };
    const setQueryParams = () => {
        deleteQueryParam();
        setQueryParam("keyword",searchKeyword);
        if(isSample){setQueryParam("sample","on")}
        if(isDlsite){setQueryParam("dlsite","on")}
        setQueryParam("order",selectedOrderValue);
    };
    const deleteQueryParam = () => {
        navigate({ search: '' });
    };

    // Enterキーを押したときisSearchがtrueになり検索apiを呼び出す
    const [isSearch, setIsSearch] = useState(false);
    const setTrueIssearch = () => {
        setIsSearch(true);
    };
    const searchSequence = () => {
        console.log("searchSequence");
        console.log(isSearch);
        if(isSearch){
            // setIsSearch(false);
            // 検索キーワードが空の場合は何もしない
            if(searchKeyword===""){
                return;
            }
            document.activeElement.blur();
            setQueryParams();
            console.log("check version :" +String(CheckVersion()));
            if(!CheckVersion()){
                window.location.reload()
            }
            getWoxramAPI();
        }
    };
    useCustomEffect(searchSequence, [isSearch]);

    // 詳細検索の開閉
    const [detailOpened, setDetailOpened] = useState( (query.get("page")?false:true));
    const toggleDetailOpened = () => setDetailOpened(!detailOpened);

    // 並び順
    const orderMenuItems=[
        {id:1, name:"発売日(昇順)", value:1},
        {id:2, name:"発売日(降順)", value:2},
        {id:3, name:"追加日(昇順)", value:3},
        {id:4, name:"追加日(降順)", value:4},
    ];

    // チェックボックス
    const toggleSample = () => {
        setIsSample(!isSample);
    };
    const toggleDlsite = () => {
        setIsDlsite(!isDlsite);
    };
    const toggleXjoin = () => {isXjoin = !isXjoin};

    // 並び順の選択肢
    const selectItems=orderMenuItems.map((item) => {
        return (
            <MenuItem key={item.id} value={item.value}>{item.name}</MenuItem>
        );
    });

    return (
        <>
            <Grid container justifyContent="center">
                <SearchAutocomplete toggleDetailOpened={toggleDetailOpened} setTrueIssearch={setTrueIssearch} firstKeyword={firstKeyword} setSearchKeyword={setSearchKeyword}/>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                {/* <SearchButton variant="contained" color="primary" size="large" onClick={()=>{onKeydown("Enter")}}><AiOutlineSearch size={20}/></SearchButton> */}
                <SearchButton variant="contained" color="primary" size="large" onClick={setTrueIssearch} style={{marginTop: "25px"}}><AiOutlineSearch size={20}/></SearchButton>
            </Grid>
            <details open={detailOpened}>
                <summary></summary>
                <hr/>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel className="custom-input-label">並び</InputLabel>
                    <Select labelId="demo-select-small" id="demo-select-small" value={selectedOrderValue} label="Age" onChange={handleChange}>
                        {selectItems}
                    </Select>
                </FormControl>
                <div>
                    <label>サンプルAI書き起こし<Checkbox defaultChecked={isSample} color="primary" onChange={toggleSample} /></label>
                    <Tooltip title="AIで作品サンプルを書き起こしたものを検索に含む。" arrow enterTouchDelay={20}><IconButton><AiFillQuestionCircle /></IconButton></Tooltip>
                </div>
                <div>
                    <label>DLsite作品ページ<Checkbox defaultChecked={isDlsite} color="primary" onChange={toggleDlsite}/></label>
                    <Tooltip title="DLsiteの作品ページのタイトル、説明を検索の内容に含む" arrow enterTouchDelay={20}><IconButton><AiFillQuestionCircle /></IconButton></Tooltip>
                </div>
                {/* <p>
                    <label>Xジョイン　<Checkbox defaultChecked={isXjoin} color="primary" onChange={toggleXjoin}/></label>
                    <Tooltip title="Xジョイン" arrow><IconButton><AiFillQuestionCircle /></IconButton></Tooltip>
                </p> */}
                <hr />
            </details>
        </>
    );
};

export default SearchMenu;