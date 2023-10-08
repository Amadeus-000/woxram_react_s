import React, { useState, useEffect } from 'react';
import store from "../../store";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // タイマーを設定します。
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);  // カウントを増加させます。
    }, 1000);

    // タイマーを解除するクリーンアップ関数を返します。
    // return () => {
    //   clearInterval(timer);
    // };
    clearInterval(timer);
  }, []);  // 空の依存配列を渡すことで、この副作用とクリーンアップ関数は一度だけ実行されます（コンポーネントがマウントされた時とアンマウントされた時）

  return <div>Count: {count}</div>;
}

export default Counter;
