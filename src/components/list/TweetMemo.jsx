
import styled from "@emotion/styled";
import { useState } from "react";
import {AiOutlineCopy, AiOutlineTwitter} from 'react-icons/ai';
import axios from "axios";

const TweetMemo=(props)=>{
    const Link = styled("a")({
        textDecoration: "none!important",
    });

    const CopyToClipboardButton = () => {
      const handleCopy = async () => {
        try {
          const data={
            public_record_id:props.public_record_id,
            chapter_name:props.chapter_name,
            text_fh:props.text_fh,
            keyword:props.keyword,
            text_lh:props.text_lh,
            color:props.color
          }
          console.log(data)
          const url="https://woxram-api.com/account/getmemoid/";
          axios.get(url,{params:data})
          .then((res)=>{
            navigator.clipboard.writeText("https://woxram.site/?memo="+res.data);
            setMsg("コピー済　");
            setColor("black");
            setShareurl("https://twitter.com/intent/tweet?text=https://woxram.com/?memo="+res.data);
            setMemourl("https://woxram.site/?memo="+res.data);
            console.log("Text copied to clipboard");
          });
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
      };

      return <span  onClick={handleCopy} style={{display: 'flex', alignItems: 'center'}}><AiOutlineCopy color={color} size={20}/>{msg}</span>;
    };
    const isIOS = () => {
      console.log(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    const handleCopyIOS = () => {
      navigator.clipboard.writeText(memourl);
    };

    const [msg, setMsg]=useState("コピー　");
    const [color,setColor]=useState("green");
    const [shareurl,setShareurl]=useState("");
    const [memourl,setMemourl]=useState("");
    // const br="%0A";
    
    return(
        <>
            {props.color==="red" && <div style={{display:"flex", fontSize:"0.75rem",marginTop:"3px"}}>
                {isIOS() && memourl
                  ?<span  onClick={handleCopyIOS} style={{display: 'flex', alignItems: 'center'}}><AiOutlineCopy color={"green"} size={20}/>クリップボート</span>
                  :<CopyToClipboardButton/>
                }
                {shareurl ? <Link href={shareurl} style={{display: 'flex', alignItems: 'center',color:"#1da1f2"}} target="_blank" rel="noopener"><AiOutlineTwitter size={20}/>ツイート</Link>:<></>}
            </div>}
        </>
    );
};

export default TweetMemo;