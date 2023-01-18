import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import { useNavigate } from "react-router";

function Slider() {
  //initializing swiper
  SwiperCore.use(Autoplay, EffectFade, Pagination, Navigation);

  const [listings, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    let list = [];
    async function fetchData() {
      const collectionRef = collection(db, "listings");
      const q = query(collectionRef, orderBy("timeStamp", "desc"), limit(5));
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        list.push({ id: doc.id, data: doc.data() });
      });
      setListing(list);
      setLoading(false);
    }
    fetchData();
  }, []);
//console.log(listings)
  if (loading) {
    return <Spinner />;
  }

  if (listings.length == 0) {
    setLoading(false);
    return <></>;
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          pagination={{type:"progressbar"}}
          navigation
          effect="fade"
          modules={EffectFade}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ id, data }) => (
            <SwiperSlide key={id} onClick={()=>{navigate(`/category/${data?.type}/${id}`)}}>
              <div
                style={{
                  background: `url(${data?.imgUrls[data.imgUrls.length - 1]}) no-repeat center`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] cursor-pointer"
                title="Click and go to the house page"
              ></div>
              <div className="py-1 ml-2 px-2 text-basic text-white font-medium bg-indigo-500 absolute top-2 rounded-tr-2xl">{data.name}</div>
              <div className="py-1 ml-2 px-2 text-basic text-white font-medium bg-red-500 absolute bottom-2 rounded-tr-2xl">{`$${data.offers ? data.discount : data.price} ${data.type === "rent" ? " / month" : "" }`}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
