import SearchAutoComplete from "../components/search/SearchAutocomplete";
import Spinner from "../components/parts/Spinner";
import WorkCard from "../components/old/WorkCard";

const Login = () => {
    const keywords=[
        {
            "keyword": "おちんちんえっと",
            "text_fh": "ほげほげ\nwwww",
            "text_lh": "もじもじaaaaaa\nええええええええええ",
            "hit_count": "2",
            "color": "red",
            "status": "台本 ... より"
        },
        {
            "keyword": "おまんこ",
            "text_fh": "aaaaaa",
            "text_lh": "zzzzzzz",
            "hit_count": "1",
            "color": "blue",
            "status": "台本 ... より"
        }
    ]
    return(
        <>
            <div>login</div>
            <SearchAutoComplete />
            <Spinner />
            <WorkCard 
                    title="10%OFF】【VR】ムラムラ フィットネス [VRゲーム屋さん] | DLsite 同人 - R18" 
                    url_img="https://img.dlsite.jp/modpub/images2/work/doujin/RJ01041000/RJ01040047_img_main.webp" 
                    url="https://www.dlsite.com/maniax/work/=/product_id/RJ01040047.html" 
                    circle="VRゲーム屋さん"
                    cv="星月るな"
                    scenario="冬月"
                    keywords={keywords}
            />
        </>
    );
};

export default Login;