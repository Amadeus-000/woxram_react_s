import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuAppBar from '../components/common/MenuAppBar';

import React, { useState } from 'react';
import { Button, TextField, Container, Typography,Grid } from '@mui/material';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

import Uploadform from "../components/account/Uploadform";

const theme = createTheme({
    palette: {
      primary: {
        main: "#282c34", // この色は任意のカラーコードに置き換えることができます。
      },
    },
    components: {
          MuiDrawer: {
              styleOverrides: {
                  paper: {
                      width: 300,
                      backgroundColor: "#282c34", // Drawerの背景色を変更
                      color: "#FFFFFF", // Drawer内のテキストの色を変更
                  },
              },
          },
      },
});

const Account = () => {
    const isLoggedIn=useSelector(state => state.account.loggedIn);
    const isLoading=useSelector(state => state.account.isLoading);
    console.log("isLoggedIn",isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn && !isLoading){
            navigate('/');
        }
        console.log("useEffect");
      }, [isLoading,isLoggedIn]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <MenuAppBar />
                    <Container maxWidth="lg" sx={{marginTop:"5rem"}}>
                        <Typography variant="h4">マイアカウント</Typography>
                        <Grid container >
                            <p>account</p>
                        </Grid>
                        <Uploadform />
                    </Container>
            </ThemeProvider>
        </>
    );
};

export default Account;