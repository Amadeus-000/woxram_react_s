import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import store from '../../store'

const ScrollObserver=()=>{
    const dispatch = useDispatch();

    useEffect(() => {
      const handleScroll = () => {
        // console.log("handleScroll");
        let prevValue=store.getState()["scroll"]["position"]
        let curValue=window.pageYOffset || document.documentElement.scrollTop
        dispatch({ type: "SET_SCROLL_POSITION", payload: window.pageYOffset || document.documentElement.scrollTop})
        
        // スクロールの向きを判定
        if(prevValue<curValue){
            dispatch({ type: "SET_SCROLL_DIRECTION", payload: "down"})
        }else{
            dispatch({ type: "SET_SCROLL_DIRECTION", payload: "up"})
        }

        // スクロールの位置が200pxを超えるか判定
        if(curValue>200){
            dispatch({ type: "SET_OVER_200", payload: true})
        }else{
            dispatch({ type: "SET_OVER_200", payload: false})
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <></>
    )
}

export default ScrollObserver;