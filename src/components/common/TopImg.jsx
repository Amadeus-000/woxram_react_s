import { Grid } from '@mui/material';
import topImg from "../../assets/images/woxram_logo_regular_400x120.png"
import styled from "@emotion/styled";

import SearchExamples from '../search/SearchExamples';

import GlobalConstant from '../GlobalConstant';
import {StyledLink} from '../parts/MyStyledComponents';

const TopImg = () => {
    const HomeImg = styled.img`
        width: 30%;
        
        @media (max-width: 768px) {
            width: 50%;
        }
    `;
    return (
        <>
            <Grid container justifyContent="center">
                <HomeImg src={topImg} alt="woxram logo"/>
            </Grid>
            <Grid container justifyContent="center">
                <div style={{marginBottom:"0.5rem"}}><StyledLink href='/ios-app-instruction'>iOSアプリ</StyledLink> / <StyledLink href='/android-app-instruction'>Androidアプリ</StyledLink></div>
            </Grid>
            <Grid container justifyContent="center">
                <div style={{marginBottom:"0.5rem"}}>Woxramはボイス・ASMRの<strong style={{color:GlobalConstant.color1}}> "セリフ" </strong>を検索することができるサービスです。</div>
            </Grid>
        </>
    );
};

export default TopImg;
