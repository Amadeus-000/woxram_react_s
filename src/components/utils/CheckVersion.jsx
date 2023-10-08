import GlobalConstant from "../GlobalConstant";

function checkVersion() {
    try{
        const request = new XMLHttpRequest();
        // const url = 'http://144.202.103.149/static/version/version.json';
        const url = 'https://woxram.com/static/version/version.json';
        const cacheBuster = '?cacheBuster=' + new Date().getTime(); // キャッシュを回避するためのクエリパラメータを追加
        request.open('GET', url + cacheBuster, false); // 第3引数にfalseを指定して同期的にリクエストを送る
        request.send(null);
    
        if (request.status === 200) {
        const data = JSON.parse(request.responseText);
        return data.version === GlobalConstant.version;
        } else {
        console.error('Error fetching data:', request.statusText);
        return true;
        }
    }catch(e){
        console.log(e);
        return true;
    }
  }

export default checkVersion;