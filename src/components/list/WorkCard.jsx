import React from 'react';
import { Grid } from '@mui/material';
import styled from "@emotion/styled";
import TweetMemo from './TweetMemo';


const WorkCard = (props) => {
    const Unit = styled(Grid)({
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingRight: "10px",
        paddingLeft: "10px",
    
        marginTop: "30px",

        boxShadow:"2px 2px 5px 5px rgb(235, 240, 240)",
        /* overflow: hidden; */
        wordBreak:"break-word"
    });
    
    const Link = styled("a")({
        textDecoration: "none!important",
    });

    let key_num=0;
    const keywords=[];
    while( ('keyword'+String(key_num)) in props.workinfo ){
        keywords.push( JSON.parse(props.workinfo['keyword'+String(key_num)]) );
        key_num++;
    }
    const Maintext=(propsKeyword)=>{
        return(
            <>
            <hr />
            <Grid container justifyContent="space-between">
                <Grid item><div style={{fontSize:"0.85rem",marginBottom:"3px"}}>{propsKeyword.keyword}　一致数 : {propsKeyword.hit_count}　<span style={{color:"gray"}}>{propsKeyword.status}</span></div></Grid>
            </Grid>
            <Grid container>
                <div style={{whiteSpace: 'pre-line',fontSize:"0.75rem"}}>  
                    {propsKeyword.text_fh}
                    <strong><span style={{color:propsKeyword.color}}>{propsKeyword.keyword}</span></strong>
                    {propsKeyword.text_lh}
                </div>
            </Grid>
            <Grid container>
                <TweetMemo 
                    public_record_id={props.workinfo.public_record_id}
                    text_fh={propsKeyword.text_fh}
                    keyword={propsKeyword.keyword}
                    text_lh={propsKeyword.text_lh}
                    chapter_name={propsKeyword.chapter_name}
                    color={propsKeyword.color}
                />
            </Grid>
            </>
        );
    };
    const MaintextSet=()=>
        keywords.map((keyword)=>{
            return(
                <>
                <Maintext 
                    keyword={keyword.keyword}
                    text_fh={keyword.text_fh}
                    text_lh={keyword.text_lh}
                    hit_count={keyword.hit_count}
                    status={keyword.status}
                    color={keyword.color}
                    chapter_name={keyword.chapter_name}
                />
                </>
            );
        });
    return (
        <>
            <Unit>
            <Grid container justifyContent="center" sx={{backgroundColor:"rgb(240,240,240)"}}>
                <Link href={props.workinfo.url} target="_blank" rel="noopener">
                    <div><img src={props.workinfo.url_img} style={{width:"100%"}}/></div>
                </Link>
            </Grid>
            <Grid container>
                <div><Link href={props.workinfo.url} target="_blank" rel="noopener">{props.workinfo.title}</Link></div>
            </Grid>
            <Grid container>
                <Grid item><div>{props.workinfo.circle} <span style={{color:"gray"}}>{props.workinfo.cv1}</span> {props.workinfo.scenario}</div></Grid>
            </Grid>
            <MaintextSet />
            </Unit>
        </>
    );
};

export default WorkCard;