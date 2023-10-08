import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


function Uploadform() {
    const csrfTokenURL="https://woxram-api.com/account/csrf-token/";
    const uploadURL="https://woxram-api.com/account/addwork/";

    const [message,setMessage] = useState('');

    const [maintexts,setMaintexts] = useState([""]);
    const [chapter_names,setChapter_names] = useState([""]);

    const [csrfToken, setCsrfToken] = useState('');

    const [url,setUrl] = useState('');
    const uid=useSelector(state => state.account.uid);

    const handleFileChange = (e,index) => {
        console.log(index)

        const file = e.target.files[0];
        const reader = new FileReader();

        // 拡張子を判定する
        const extension = file.name.split('.').pop();
        console.log(extension);  // これで拡張子を表示できます

        // ファイル名を取得する
        const filename = file.name;

        // txtファイルのとき中身を取得する
        if (extension === 'txt') {
            reader.onload = function(event) {
                console.log(event.target.result);

                // ファイルの中身をstateに保存する
                const new_maintexts = [...maintexts];
                new_maintexts[index] = event.target.result;
                setMaintexts(new_maintexts);

                // ファイル名をstateに保存する
                const new_chapter_names = [...chapter_names];
                new_chapter_names[index] = filename;
                setChapter_names(new_chapter_names);
            };
            reader.readAsText(file);
        }else{
            setMessage('txtファイルを選択してください');
        }
    };

    const handleUpload = () => {
        axios.get(csrfTokenURL)
        .then((response) => {
            console.log(response.data.csrfToken);
            setCsrfToken(response.data.csrfToken);

            const config = {
                headers: {
                    "X-CSRFToken": csrfToken
                }
            };
            const data = {
                "uid":uid,
                "url":url,
                "maintexts":maintexts,
                "chapter_names":chapter_names
            };
            axios.post(uploadURL, data, config)
            .then((response) => {
                console.log(response);
            })
        })
    };

    const addFileform = () => {
        setMaintexts([...maintexts,""]);
        setChapter_names([...chapter_names,""]);
    };

    const handleURL=(e)=>{
        console.log(e.target.value);
        setUrl(e.target.value);
    }

    return (
        <div>
            {maintexts.map((maintext, index) => {
                return(
                    <>
                    <p>{index}</p>
                    <input type="file" onChange={(e)=>{handleFileChange(e,index)}} />
                    <p>{maintext}</p>
                    </>
                );
            })}
            <button onClick={addFileform}>+</button>
            <br />
            <button onClick={handleUpload}>Upload</button>

            <p>URL</p>
            <input type="text" onChange={e=>{handleURL(e)}} />
        </div>
    );
}

export default Uploadform;
