import { useEffect, useRef } from 'react';

function useCustomEffect(callback, dependencies) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }
  }, dependencies);
}

export default useCustomEffect;


// 初回実行時にはcallbackを実行しないカスタムフック