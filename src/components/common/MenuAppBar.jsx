import React from 'react';
import {useState, useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';
import {List,ListItem,ListItemButton,ListItemText} from '@mui/material';
import styled from "@emotion/styled";

import title from "../../assets/images/woxram_logo_regular_360x60_white.png"
import logoimg from "../../assets/images/woxram_icon.png"
import GlobalConstant from "../GlobalConstant";
import axios from 'axios';

import AccountMenu from '../account/AccountMenu';
import TwitterLogin from '../account/TwitterLogin';
import { useSelector } from 'react-redux';


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
                    width: 200,
                    backgroundColor: "#282c34", // Drawerの背景色を変更
                    color: "#FFFFFF", // Drawer内のテキストの色を変更
                },
            },
        },
    },
});


const MenuAppBar = () => {
    console.log("MenuAppBar");
    const [databaseDate, setDatabaseDate] = useState("");
    axios.get('https://woxram-api.com/search/getdatabaseinfo/'
    ).then(function (response) {
        setDatabaseDate(response.data);
    })
    const [drawerOpened, setDrawerOpened] = useState(false);
    const isOver200=useSelector(state => state.scroll.over200);
    const scrollDirection=useSelector(state => state.scroll.direction);
  
    const StyledAppBar = styled(AppBar)({
        transition: 'transform 0.2s ease-in-out',
        transform:
            // 変更: ページ上部から 200px 以内、またはスクロール方向が上の場合に AppBar を表示
            !isOver200 || scrollDirection === 'up'
            ? 'translateY(0)'
            : 'translateY(-100%)',
        // display: 
        //     !isOver200 || scrollDirection === 'up'
        //     ? 'block'
        //     : 'none',
        
    });

    const anchorRef = useRef(null);

	return (
        <>
		<ThemeProvider theme={theme}>
            <StyledAppBar position="fixed" color="primary" style={{height: "3rem"}} >
                <Toolbar style={{minHeight:"100%",justifyContent: 'space-between'}} ref={anchorRef}>
                    {/* 左側 */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpened(true)}>
                        <MenuIcon />
                    </IconButton>
                    <img src={logoimg} alt="woxram logo" style={{height:"2rem",marginLeft:"0.1rem"}} />
                    <a href='https://woxram.site/'><img src={title} alt="woxram logo" style={{height:"1.2rem",marginTop:"0.3rem",marginLeft:"0.4rem"}} /></a>
                    </div>

                    {/* 右側 */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <AccountMenu anchorRef={anchorRef}/>
                    </div>
                </Toolbar>
            </StyledAppBar>

            <Drawer anchor={'left'} open={drawerOpened} onClose={() => setDrawerOpened(false)}>
                <List component="nav">
                    <ListItem>
                        <ListItemButton component="a" href="/" rel="noopener noreferrer"><ListItemText primary="ホーム" /></ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component="a" href="/about/" rel="noopener noreferrer"><ListItemText primary="サイトについて" /></ListItemButton>
                    </ListItem>
                    <ListItem>
                        <TwitterLogin />
                    </ListItem>
                </List>
                <div style={{position: "fixed",bottom: "0.7rem",fontSize:"0.7rem"}}>{databaseDate}</div>
                <div style={{position: "fixed",bottom: "0",fontSize:"0.7rem"}}>version {GlobalConstant.version}</div>
            </Drawer>
		</ThemeProvider>
        </>
	);
};

export default MenuAppBar;