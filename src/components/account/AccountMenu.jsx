import React from 'react';
import { useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {NoUnderLineLinkBlack} from '../parts/MyStyledComponents';

const AccountIcon=(props)=>{
    const iconImageURL=useSelector(state => state.account.iconImageURL);
    const [isOpen, setIsOpen] = useState(false);
    // const anchorRef=props.anchorRef;
    const [anchorRef,setAnchorRef]=useState(null);

    const iconStyle={
        height:"30px",
        marginLeft:"5px",
        borderRadius: '50%',
        textAlign:'right'
    }

    const handleClick = () => {
        setAnchorRef((props.anchorRef).current);
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <img src={iconImageURL} alt="アカウントアイコン" style={iconStyle} onClick={handleClick}/>
            <Menu
                anchorEl={anchorRef}
                keepMounted
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoFocus = {false}
            >
                <MenuItem onClick={handleClose}><NoUnderLineLinkBlack href="/account/">Account</NoUnderLineLinkBlack></MenuItem>
                <MenuItem onClick={handleClose}>新しい機能を制作中！</MenuItem>
            </Menu>
        </div>
    );
};

const AccountMenu=(props)=>{
    const dispatch = useDispatch();
    const isLoggedIn=useSelector(state => state.account.loggedIn);


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log("onAuthStateChanged");
            if (user) {
                dispatch({ type: "SET_LOGGED_IN" });
                dispatch({ type: "SET_UID", payload: user.uid });
                dispatch({ type: "SET_ICON_IMAGE_URL", payload: user.photoURL });
                dispatch({ type: "SET_IS_LOADING"});
                // console.log("user is logged in");
            } else {
                dispatch({ type: "SET_LOGGED_OUT" });
                dispatch({ type: "SET_IS_LOADING"});
                // console.log("user is logged out");
            }
        });
        return () => unsubscribe();
    }
    , [dispatch]);

    return(
        <>
            {isLoggedIn 
                ? <AccountIcon anchorRef={props.anchorRef}/>
                : <></>
            }
        </>
    )
}

export default AccountMenu;

