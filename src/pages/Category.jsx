import ContactForm from "../components/ContactForm";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { FaBath, FaBed, FaChair, FaParking, FaShare } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { getAuth } from "firebase/auth";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";


function Category() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [contactButton, setContactButton] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const auth = getAuth();

  /**Show Form function*/
  const showContactForm = () => {
    setContactButton(false);
    setShowForm(true);
  };
  /**Function to format the price label*/
  const formatPrice = () => {
    const label = data.offers
      ? data.discount.toLocaleString("en-US")
      : data.price.toLocaleString("en-US");
    return `$ ${label}`;
  };

  /**Share Function - to copy the actual link to clipboard*/
  const copyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  /**Fetch data of the list from db to fill the page*/
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setData(docSnap.data());
        setLoading(false);
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
                background: `url(${data.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="absolute z-10 top-[60px] right-[10px] text-lg text-slate-500 bg-white p-3.5 rounded-full"
        title="Copy link"
        onClick={copyShare}
      >
        <FaShare />
      </div>
      {copied && (
        <div className="absolute z-10 top-[65px] right-[60px] text-sm bg-sky-300 p-2 rounded-full">
          Copied
        </div>
      )}
      <div className="flex flex-col md:flex-row lg:space-x-5 max-w-6xl mx-auto mt-4 mb-6 py-9 px-4 bg-white rounded-md shadow-lg">
        <div className="w-full">
          <h3 className="text-xl text-sky-900 font-bold pb-3">
            <span>{data.name} - </span>
            {formatPrice()}
            <span>{data.type.includes("rent") ? " / Month" : " "}</span>
          </h3>
          <div
            className="flex justify-start items-center space-x-2 mb-3"
            title="Location"
          >
            <span className="text-green-600">
              <HiLocationMarker />
            </span>
            <span className="text-base text-slate-800 font-semibold truncate">
              {data.address}
            </span>
          </div>
          <div className="flex space-x-5">
            <div className="w-[200px] bg-red-800 rounded-md shadow-md p-1 mb-3 text-center text-base text-white font-semibold capitalize">{`For ${data.type}`}</div>
            {data.offers && (
              <div className="w-[200px] bg-green-800 rounded-md shadow-md p-1 mb-3 text-center text-base text-white font-semibold">{`$ ${
                Number.parseInt(data.price) - Number.parseInt(data.discount)
              } discount`}</div>
            )}
          </div>
          <div className="mb-3">
            <span className="font-semibold text-slate-800">Description</span>
            <span className="text-slate-800 pb-1">{` - ${data.description}`}</span>
          </div>
          <ul className="flex flex-wrap justify-start gap-8">
            <li className="flex space-x-2 items-center text-sm font-semibold ">
              <FaBed />
              <span>{`${data.beds} ${data.beds > 1 ? "Beds" : "Bed"}`}</span>
            </li>
            <li className="flex space-x-2 items-center text-sm font-semibold ">
              <FaBath />
              <span>{`${data.baths} ${
                data.baths > 1 ? "Baths" : "Bath"
              }`}</span>
            </li>
            <li className="flex space-x-2 items-center text-sm font-semibold ">
              <FaParking />
              <span>{data.parking ? "Parking Spot" : "No Parking"}</span>
            </li>
            <li className="flex space-x-2 items-center text-sm font-semibold ">
              <FaChair />
              <span>{data.furnished ? "Furnished" : "Not Furnished"}</span>
            </li>
          </ul>
          <div>
            {showForm && <ContactForm data={data} />}
            {auth.currentUser.uid !== data.user && contactButton && (
              <button
                className="w-full shadow-md rounded-md my-5 py-2 bg-blue-600 text-white text-center font-semibold uppercase transition ease-in-out duration-100 hover:bg-blue-700"
                onClick={showContactForm}
              >
                Contact Landlord
              </button>
            )}
          </div>
        </div>
        <div className="w-full z-10 h-[280px] md:h-[400px] md:ml-4">
          <MapContainer
            center={[data.geoLocation.lat, data.geoLocation.lon]}
            zoom={13}
            scrollWheelZoom={false}
            style={{height:"100%", width:"100%"}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data.geoLocation.lat, data.geoLocation.lon]}>
              <Popup>
                {`${data.address} - The location of the house`}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}

export default Category;
