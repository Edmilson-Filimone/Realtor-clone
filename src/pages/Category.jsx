import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

function Category() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false)
  SwiperCore.use([Autoplay, Navigation, Pagination])

  /**Share Function - to copy the actual link to clipboard*/
  const copyShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(()=>{setCopied(false)}, 3000)
  }

  /**Fetch data of the list from db to fill the page*/
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setData(docSnap.data());
        setLoading(false);
        console.log(docSnap.data());
      }
    }
    fetchData();
  }, [params.id]);
  //loading icon
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {data.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[300px] overflow-hidden"
              style={{
                background: `url(${data.imgUrls[index]}) center no-repeat`, backgroundSize:'cover'
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-10 top-[60px] right-[10px] text-lg text-slate-500 bg-white p-3.5 rounded-full" title="Copy link" onClick={copyShare}><FaShare/></div>
      {copied && (<div className="absolute z-10 top-[65px] right-[60px] text-sm bg-sky-300 p-2 rounded-full">Copied</div>)}
    </main>
  );
}

export default Category;
