import React from 'react';
import { Grid } from '@mui/material';
import styled from "@emotion/styled";


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


    const Maintext=(props)=>{
        return(
            <>
            <hr />
            <Grid container>
                <div>{props.keyword}　一致数 : {props.hit_count}　<span style={{color:"gray"}}>{props.status}</span></div>
            </Grid>
            <Grid container>
                <div style={{whiteSpace: 'pre-line',fontSize:"85%"}}>  
                    {props.text_fh}
                    <strong><span style={{color:props.color}}>{props.keyword}</span></strong>
                    {props.text_lh}
                </div>
            </Grid>
            </>
        );
    };
    const MaintextSet=()=>
        (props.keywords).map((keyword)=>{
            return(
                <>
                <Maintext 
                    keyword={keyword.keyword}
                    text_fh={keyword.text_fh}
                    text_lh={keyword.text_lh}
                    hit_count={keyword.hit_count}
                    status={keyword.status}
                    color={keyword.color}
                />
                </>
            );
        });
    return (
        <>
            <Unit>
            <Grid container justifyContent="center" sx={{backgroundColor:"rgb(240,240,240)"}}>
                <Link href={props.url} target="_blank" rel="noopener">
                    <div><img src={props.url_img} style={{width:"100%"}}/></div>
                </Link>
            </Grid>
            <Grid container>
                <div><Link href={props.url} target="_blank" rel="noopener">{props.title}</Link></div>
            </Grid>
            <Grid container>
                <div>{props.circle} <span style={{color:"gray"}}>{props.cv}</span> {props.scenario}</div>
            </Grid>
            <MaintextSet />
            </Unit>
        </>
    );
};

export default WorkCard;