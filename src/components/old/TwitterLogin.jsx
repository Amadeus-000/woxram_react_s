import React from 'react';
import { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuth, TwitterAuthProvider, signInWithPopup, onAuthStateChanged ,signOut} from "firebase/auth";
import {ListItemButton} from '@mui/material';


const mapStateToProps = state => {
    return { loggedIn: state.loggedIn, iconImageURL: state.iconImageURL }
}
const mapDispatchToProps = (dispatch) => {
    return {
      logIn: () => dispatch({ type: "SET_LOGGED_IN" }),
      logOut: () => dispatch({ type: "SET_LOGGED_OUT" }),
      setIconImageURL: (url) => dispatch({ type: "SET_ICON_IMAGE_URL", payload: url }),
      setUID: (uid) => dispatch({ type: "SET_UID", payload: uid }),
      setIsLoading: () => dispatch({ type: "SET_IS_LOADING"}),
    };
};

const TwitterLogin=(props)=>{
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setLoggedIn(true);
                props.logIn();
                props.setUID(user.uid);
                props.setIconImageURL(user.photoURL)
                props.setIsLoading()
                console.log("user is logged in");
            } else {
                setLoggedIn(false);
                props.logOut();
                props.setIsLoading()
                console.log("user is logged out");
            }
        });

        return () => unsubscribe();
    }, []);

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
            {loggedIn
                ?<ListItemButton type="button" onClick={handleLogout}>ログアウト</ListItemButton>
                :<ListItemButton onClick={signInWithTwitter}>Twitterでログイン</ListItemButton>
            }
        </>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(TwitterLogin);