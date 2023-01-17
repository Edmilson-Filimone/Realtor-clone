import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { db, storage } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

const createListing = () => {
  const auth = getAuth()
  const navigate = useNavigate();
  const [enableGeolocation, setGeolocation] = useState(false);
  const [getLoadingStatus, setLoadingStatus] = useState(false);
  const [file, setFile] = useState(""); //for file input
  const [inputData, setInputData] = useState({
    type: "sell",
    name: "",
    beds: 0,
    baths: 0,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offers: true,
    price: 0,
    discount: 0,
    longitude: 0,
    latitude: 0,
  });

  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnished,
    address,
    description,
    offers,
    price,
    discount,
    longitude,
    latitude,
  } = inputData;

  const onchange = (e) => {
    e.preventDefault();

   /**For the input file only*/
   if (e.target.files) {
    setFile(e.target.files);
    console.log(file);
  }

    /**Getting data from boolean inputs - buttons*/
    let bool = null;

    if (e.target.value === "true") {
      bool = true;
    }

    if (e.target.value === "false") {
      bool = false;
    }

    /**For boolean and others inputs: text and number*/
    if (!e.target.files) {
      setInputData((prevStat) => ({
        ...prevStat,
        [e.target.id]: bool ?? e.target.value,
      }));
    }
  };

  /**1-A uploadImage function*/
  async function uploadImage(image) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuid()}`;
      const storageRef = ref(storage, fileName);
      const metadata = {
        contentType: "image/png",
      };

      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      uploadTask.on(
        "state_changed",
        //log progress callback
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        //error callback
        (error) => {
          reject(error);
        },
        //sucess callback
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  /**OnSubmit*/
  async function onsubmit(e) {
    e.preventDefault();
    setLoadingStatus(true);

    if (discount >= price) {
      setLoadingStatus(false);
      toast.error("Discount should not overpass the regular price");
    }

    if (file.length > 6) {
      setLoadingStatus(false);
      toast.error("Can't upload more than 6 images");
    }


    let geoLocation = {};

    if (!enableGeolocation) {
      let data = await fetch(
        `https://api.tomtom.com/search/2/geocode/${address}.json?key=9DpwzwWqg0M34AB4wbOnxYqHBFCSV8rk`
      )
        .then((result) => result.json())
        .then((json) => json)
        .catch((error) => {
          console.log(error);
        });

      if (data.results[0] === "undefined") {
        setLoadingStatus(false);
        toast.error("Please provide a correct address");
        return;
      }
      if (data.results[0]) {
        geoLocation.lat = data.results[0]?.position.lat ?? 0;
        geoLocation.lon = data.results[0]?.position.lon ?? 0;
      }
    }

    /**1-A uploading imgs to fire storage*/

    const imgUrls = await Promise.all(
      [...file].map((img) => uploadImage(img)) //we spread content the 'file' into the array to be able to use map() to create a new array of urls
    ).catch((error) => {
      setLoadingStatus(false);
      toast.error(error);
      return;
    });


    //upload the info to the db
    //finalData
    const finalData = {
      ...inputData,
      geoLocation,
      imgUrls,
      user: auth.currentUser.uid,
      timeStamp: serverTimestamp(),
    };
    //removing the discount price if offer is no (false)
    !finalData.offers && delete finalData.discount; //if(offers == false){delete finalData.discount}
    if(!enableGeolocation){
      delete finalData.latitude
      delete finalData.longitude
    }
    const collectionRef = collection(db, "listings"); //getting the collection reference
    const docRef = await addDoc(collectionRef, finalData); //uploading the data
    setLoadingStatus(false);
    toast.success('Listing created successfully')
    navigate(`/category/${finalData.type}/${docRef.id}`)
  }

  if (getLoadingStatus) return <Spinner />;

  return (
    <>
      <h1 className="mt-3 mb-3 text-3xl text-center font-bold ">
        Create a Listing
      </h1>
      <form className="w-full max-w-[540px] mx-auto px-4 md:px-[40px]" onSubmit={onsubmit}>
        <label className="font-medium">Sell / Rent</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            id="type"
            type="button"
            value="sell"
            onClick={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              type === "sell" ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            sell
          </button>
          <button
            id="type"
            type="button"
            value="rent"
            onClick={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              type === "rent" ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            Rent
          </button>
        </div>
        <label className="font-medium" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          required
          minLength={10}
          maxLength={200}
          onChange={onchange}
          className="shadow-md rounded border border-gray-300 focus:border-slate-300"
        />

        <div className="flex gap-5 my-5">
          <div className="w-1/4">
            <label className="font-medium" htmlFor="beds">
              Beds
            </label>
            <input
              type="number"
              name="beds"
              id="beds"
              value={beds}
              required
              minLength={0}
              maxLength={30}
              onChange={onchange}
              className="shadow-md rounded border border-gray-300 focus:border-slate-300"
            />
          </div>
          <div className="w-1/4">
            <label className="font-medium" htmlFor="baths">
              Baths
            </label>
            <input
              type="number"
              name="baths"
              id="baths"
              value={baths}
              required
              minLength={1}
              maxLength={30}
              onChange={onchange}
              className="shadow-md rounded border border-gray-300 focus:border-slate-300"
            />
          </div>
        </div>

        <label className="font-medium">Parking spot</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            id="parking"
            type="button"
            value={true}
            onClick={onchange}
            className={`w-full py-2 px-3 text-sm font-medium  border border-gray-200 shadow-lg rounded ${
              parking ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            yes
          </button>
          <button
            id="parking"
            type="button"
            value={false}
            onClick={onchange}
            className={`w-full py-2 px-3 text-sm font-medium uppercase border border-gray-200 shadow-lg rounded ${
              !parking ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            no
          </button>
        </div>

        <label className="font-medium">Furnished</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            id="furnished"
            type="button"
            value={true}
            onClick={onchange}
            className={`w-full py-2 px-3 text-sm font-medium uppercase border border-gray-200 shadow-lg rounded ${
              furnished ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            yes
          </button>
          <button
            id="furnished"
            type="button"
            value={false}
            onClick={onchange}
            className={`w-full py-2 px-3 text-sm font-medium uppercase border border-gray-200 shadow-lg rounded ${
              !furnished ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            no
          </button>
        </div>

        <label className="font-medium" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={address}
          required
          minLength={3}
          maxLength={300}
          onChange={onchange}
          className="shadow-md rounded border border-gray-300 focus:border-slate-300"
        />

        {enableGeolocation && (
          <div className="flex space-x-5">
            <div>
              <label className="font-medium" htmlFor="longitude">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                placeholder={0}
                value={longitude}
                required
                minLength={-180}
                maxLength={180}
                onChange={onchange}
                className="shadow-md rounded border border-gray-300 focus:border-slate-300"
              />
            </div>

            <div>
              <label className="font-medium" htmlFor="latitude">
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                placeholder={0}
                value={latitude}
                required
                minLength={-90}
                maxLength={90}
                onChange={onchange}
                className="shadow-md rounded border border-gray-300 focus:border-slate-300"
              />
            </div>
          </div>
        )}

        <label className="font-medium" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          required
          min={20}
          maxLength={300}
          onChange={onchange}
          className="shadow-md rounded border border-gray-300 focus:border-slate-300"
        />

        <label className="font-medium">Offers</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            id="offers"
            type="button"
            value={true}
            onClick={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              offers ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            yes
          </button>
          <button
            id="offers"
            type="button"
            value={false}
            onClick={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              !offers ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            no
          </button>
        </div>

        <label className="font-medium" htmlFor="price">
          Regular Price
        </label>
        <div className="flex items-center gap-5">
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            required
            minLength={50000}
            maxLength={500000}
            onChange={onchange}
            className="w-1/4 shadow-md rounded border border-gray-300 focus:border-slate-300"
          />
          {type === "rent" ? <span>$ / Month</span> : <span> $ </span>}
        </div>

        {offers && (
          <div>
            <label className="font-medium" htmlFor="discount">
              Discount price
            </label>
            <div className="flex items-center gap-5">
              <input
                type="number"
                name="discount"
                id="discount"
                value={discount}
                minLength={0}
                onChange={onchange}
                className="w-1/4 shadow-md rounded border border-gray-300 focus:border-slate-300"
              />
              {type === "rent" ? <span>$ / Month</span> : <span>$</span>}
            </div>
          </div>
        )}

        <label className="font-medium" htmlFor="images">
          Image
        </label>
        <label className="block text-sm mb-0" htmlFor="images">
          The image will be the cover (max 6)
        </label>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          max="6"
          multiple
          required
          onChange={onchange}
          className="bg-white px-2 py-3 mt-0 shadow-md rounded border border-gray-300"
        />

        <button
          className="w-full text-white uppercase font-semibold bg-blue-500 px-2 py-2 mt-2 mb-4 shadow-md rounded hover:brightness-90 duration-75 ease-in-out"
          type="submit"
        >
          create listing
        </button>
      </form>
    </>
  );
};

export default createListing;
