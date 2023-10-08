import React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Container } from '@mui/material';

import MenuAppBar from '../components/common/MenuAppBar';
import TopImg from '../components/common/TopImg';
import SearchMenu from '../components/search/SearchMenu';
import WorkCard from '../components/list/WorkCard';
import Spinner from '../components/parts/Spinner';
import CustomPagination from '../components/list/CustomPagenation';

import ScrollObserver from '../components/utils/ScrollObserver';


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


const Home = () => {
    console.log("Home.jsx");
    const [loading, setLoading] = useState(false);
    const [resultList, setResultList] = useState();
    const [numberOfWorks, setNumberOfWorks] = useState(-1);

    const showResult = (data) => {
        let data_obj=JSON.parse(data);
        setResultList(data_obj[0].map((item)=><WorkCard workinfo={item} />));
        setNumberOfWorks(data_obj[1]);
    };

    return (
		<ThemeProvider theme={theme}>
            <div className="App">
                <ScrollObserver />
                <MenuAppBar/>
                <Container maxWidth="lg" sx={{marginTop:"5rem"}}>
                    <TopImg />
                    <SearchMenu showResult={showResult} setLoading={setLoading}/>
                    {loading && <Grid container justifyContent="center"><Spinner /></Grid>}
                    {(numberOfWorks!==0 && numberOfWorks!==-1) && <Grid container justifyContent="center"><CustomPagination numberOfWorks={numberOfWorks} /></Grid>}
                    {numberOfWorks!==-1 && <div>検索結果 {numberOfWorks} 件</div>}
                    {resultList}
                    {(numberOfWorks!==0 && numberOfWorks!==-1) && <Grid container justifyContent="center"><CustomPagination numberOfWorks={numberOfWorks}/></Grid>}
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Home;

