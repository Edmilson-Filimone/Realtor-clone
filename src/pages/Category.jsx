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
import { FaBath, FaBed, FaChair, FaParking, FaShare } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

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
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-4 mb-6 py-9 px-4 bg-white rounded-md shadow-md">
        <div className="w-full">
          <h3 className="text-xl text-sky-900 font-bold pb-2.5">
            <span>{data.name} - </span>
            {
             data.offers ? data.discount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }):
              data.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            }
            <span>{data.type.includes("rent")?" / Month":" "}</span>
          </h3>
        <div className="flex justify-start items-center space-x-2 mb-2.5" title="Location">
          <span className="text-green-600">
            <HiLocationMarker />
          </span>
          <span className="text-base text-slate-800 font-semibold truncate">
            {data.address}
          </span>
        </div>
        <div className="w-[180px] bg-red-800 rounded-md shadow-md p-1 mb-2.5 text-center text-base text-white font-semibold capitalize">{`For ${data.type}`}</div>
        <div className="mb-2">
          <span className="font-semibold text-slate-800">Description</span>
          <span className="text-slate-800 pb-1">{` - ${data.description}`}</span>
        </div>
        <ul className="flex justify-start space-x-8">
          <li className="flex space-x-2 items-center text-sm font-semibold ">
            <FaBed />
            <span>{`${data.beds} ${data.beds > 1 ? "Beds" : "Bed"}`}</span>
          </li>
          <li className="flex space-x-2 items-center text-sm font-semibold ">
            <FaBath />
            <span>{`${data.baths} ${data.baths > 1 ? "Baths" : "Bath"}`}</span>
          </li>
          {data.parking && (<li className="flex space-x-2 items-center text-sm font-semibold ">
            <FaParking />
            <span>Parking Spot</span>
          </li>)}
          {data.furnished && (<li className="flex space-x-2 items-center text-sm font-semibold ">
            <FaChair/>
            <span>Furnished</span>
          </li>)}
        </ul>
        </div>
        <div className="w-full h-[300px] bg-slate-400"></div>
      </div>
    </main>
  );
}

export default Category;
