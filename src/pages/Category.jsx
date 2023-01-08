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

function Category() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination])

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
    </main>
  );
}

export default Category;
