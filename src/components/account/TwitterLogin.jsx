import React from 'react';
import { getAuth, TwitterAuthProvider, signInWithPopup ,signOut} from "firebase/auth";
import {ListItemButton} from '@mui/material';
import { useSelector } from 'react-redux';

const TwitterLogin=()=>{
    const isLoggedIn=useSelector(state => state.account.loggedIn);

    const signInWithTwitter = () => {
        const provider = new TwitterAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
        .then((result) => {
          // ログイン成功時の処理
          console.log(result.user);
        })
        .catch((error) => {
          // ログイン失敗時の処理
          console.error(error);
        });
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          console.log("Logged out successfully.");
        }).catch((error) => {
          // An error happened.
          console.error("Failed to log out.", error);
        });
    };

    return (
        <>
            {isLoggedIn
                ?<ListItemButton type="button" onClick={handleLogout}>ログアウト</ListItemButton>
                :<ListItemButton onClick={signInWithTwitter}>Twitterでログイン</ListItemButton>
            }
        </>
    );
}

export default TwitterLogin;