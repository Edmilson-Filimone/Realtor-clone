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
import { Link } from "react-router-dom";

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
        limit(4)
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
        limit(4)
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
        limit(4)
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
        {doneOffer && (
          <div>
            <h3 className="text-xl font-medium py-4">Recent Offers</h3>
            <Link to='/offers'
              className="block text-sm text-blue-600 font-medium cursor-pointer"
              title="See more"
            >
              Show more offers
            </Link>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {offers.map(({ id, data }) => (
                <Card key={id} id={id} data={data} />
              ))}
            </div>
          </div>
        )}
        {doneRent && (
          <div>
            <h3 className="text-xl font-medium py-4">Places for Rent</h3>
            <Link to='category/rent'
              className="block text-sm text-blue-600 font-medium cursor-pointer"
              title="See more"
            >
              Show more places for rent
            </Link>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {rent.map(({ id, data }) => (
                <Card key={id} id={id} data={data} />
              ))}
            </div>
          </div>
        )}
        {doneSale && (
          <div>
            <h3 className="text-xl font-medium py-4">Places for Sale</h3>
            <Link to='/category/sell'
              className="block text-sm text-blue-600 font-medium cursor-pointer"
              title="See more"
            >
              Show more places for sale
            </Link>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {sale.map(({ id, data }) => (
                <Card key={id} id={id} data={data} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
