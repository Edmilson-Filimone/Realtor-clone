import Slider from "../components/Slider";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

const Home = () => {
  const [offers, setOffers] = useState();
  const [rent, setRent] = useState([]);
  const [sale, setSale] = useState([]);
  const [doneOffer, setDoneOffer] = useState(false);
  const [doneRent, setDoneRent] = useState(false);
  const [doneSale, setDoneSale] = useState(false);

  //fetching data for offers cards
  useEffect(() => {
    let list = [];
    async function fetchData() {
      const collectionRef = collection(db, "listings");
      const q = query(
        collectionRef,
        where("offers", "==", true),
        orderBy("timeStamp", "desc"),
        limit(5)
      );
      const docSnap = await getDocs(q);

      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          console.log(doc.id, "==>", doc.data());
          list.push({ id: doc.id, data: doc.data() });
        });

        setOffers(list);
        setDoneOffer(true);
      }
    }
    fetchData();
  }, []);

  //fetching data for rent cards
  useEffect(() => {
    let list = [];
    async function fetchData() {
      const collectionRef = collection(db, "listings");
      const q = query(
        collectionRef,
        where("type", "==", "rent"),
        orderBy("timeStamp", "desc"),
        limit(5)
      );
      const docSnap = await getDocs(q);

      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          console.log(doc.id, "==>", doc.data());
          list.push({ id: doc.id, data: doc.data() });
        });

        setRent(list);
        setDoneRent(true);
      }
    }
    fetchData();
  }, []);

  //fetching data for sales cards
  useEffect(() => {
    let list = [];
    async function fetchData() {
      const collectionRef = collection(db, "listings");
      const q = query(
        collectionRef,
        where("type", "==", "sell"),
        orderBy("timeStamp", "desc"),
        limit(5)
      );
      const docSnap = await getDocs(q);

      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          console.log(doc.id, "==>", doc.data());
          list.push({ id: doc.id, data: doc.data() });
        });

        setSale(list);
        setDoneSale(true);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Slider />
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-medium py-4">Recent Offers</h3>
        <span
          className="block text-sm text-blue-600 font-medium cursor-pointer"
          title="See more"
        >
          Show more offers
        </span>
        <div className="w-full flex grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {doneOffer &&
            offers.map(({ id, data }) => <Card key={id} id={id} data={data} />)}
        </div>
        <h3 className="text-xl font-medium py-4">Places for Rent</h3>
        <span
          className="block text-sm text-blue-600 font-medium cursor-pointer"
          title="See more"
        >
          Show more places for rent
        </span>
        <div className="w-full flex grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {doneRent &&
            rent.map(({ id, data }) => <Card key={id} id={id} data={data} />)}
        </div>
        <h3 className="text-xl font-medium py-4">Places for Sale</h3>
        <span
          className="block text-sm text-blue-600 font-medium cursor-pointer"
          title="See more"
        >
          Show more places for sale
        </span>
        <div className="w-full flex grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {doneSale &&
            sale.map(({ id, data }) => <Card key={id} id={id} data={data} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
