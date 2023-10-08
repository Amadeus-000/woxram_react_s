// import './SearchMenu.css';
import { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import axios from 'axios';

import GlobalConstant from '../GlobalConstant';
import {StyledLink,NoUnderLineLink} from '../parts/MyStyledComponents';

import Button from '@mui/material/Button';



const SearchExamples = () => {
    const DivSE=styled("div")({
        display:"flex",
        flexWrap: "wrap",
        paddingRight:"0.5rem",
        paddingLeft:"0.5rem",
        fontSize:"0.8rem",
    });

    const [examples, setExamples] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    // let result=[];
    useEffect(() => {
        axios.get('https://woxram-api.com/search/randsearchexample/'
        )
        .then(function (response) {
            console.log(response.data);
            // const result=response.data;
            setExamples(response.data);
            console.log(examples)
        })
        .catch(function (error) {
                console.log(error);
        });
    }, []);
    const toggleOpend=()=>{
        setIsOpened(!isOpened);
    };
    let toggleColor=true;
    const fontGray={color:"#242424"}
    const Examples=()=>
        examples.map((example)=>{
            toggleColor=!toggleColor;
            return (
                <>
                {/* <div style={{marginRight:"1rem",marginBottom:"0.3rem"}}><StyledLink href={example[1]} style={toggleColor?fontGray:{}}>{example[0]}</StyledLink></div> */}
                <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    style={{
                        marginRight:"0.5rem",
                        marginBottom:"0.2rem",
                        paddingTop:"0.15rem",
                        paddingBottom:"0rem",
                        paddingLeft:"0.2rem",
                        paddingRight:"0.2rem",
                        fontSize:"0.8rem",
                        borderColor:"#dcdcdc"
                    }}
                >
                    <NoUnderLineLink href={example[1]}>{example[0]}</NoUnderLineLink>
                </Button>
                </>
            );
        });
    return (
        <>
            <div onClick={toggleOpend} style={{textAlign:"center",fontSize:"1.2rem",color:GlobalConstant.linkcolor}}>検索例</div>
            <div>
            <details open={isOpened}>
                <summary></summary>
                <hr/>
                <DivSE><Examples /></DivSE>
                <hr/>
            </details>
            </div>
        </>
    );
};

export default SearchExamples;