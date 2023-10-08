import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid } from '@mui/material';
import styled from "@emotion/styled";


import MenuAppBar from '../components/common/MenuAppBar';

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
const AndroidAppInstruction = () => {
    const varWidth=19200/window.innerWidth+20;
    const CustomImg=styled("img")({
        width:String(varWidth)+"%",
        // width:"80%",
        margin:"auto",
        marginBottom:"1rem",
    });
    const CustomDiv=styled("div")({
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"1rem",
    });
    return(
        <>
            <ThemeProvider theme={theme}>
                <MenuAppBar />
                <Container maxWidth="lg" sx={{marginTop:"100px"}}>
                <Grid container>
                    <div style={{fontSize:"1.2rem",marginBottom:"1rem"}}>Android用アプリのインストール</div>
                    <CustomDiv><CustomImg src="https://woxram.com/media/instructions/android1.jpg" /></CustomDiv>
                    <CustomDiv><CustomImg src="https://woxram.com/media/instructions/android2.jpg" /></CustomDiv>
                    <CustomDiv><CustomImg src="https://woxram.com/media/instructions/android3.jpg" /></CustomDiv>
                </Grid>

                </Container>
            </ThemeProvider>
        </>
    );
};

export default AndroidAppInstruction;
