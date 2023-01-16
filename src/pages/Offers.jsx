import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";

const Offers = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryLimit, setQueryLimit] = useState(4);

  useEffect(() => {
    let list = [];
    async function fetchData() {
      const collectionRef = collection(db, "listings");
      const q = query(
        collectionRef,
        where("offers", "==", true),
        orderBy("timeStamp", "desc"),
        limit(queryLimit)
      );
      const docSnap = await getDocs(q);
      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          list.push({ id: doc.id, data: doc.data() });
        });
      }

      setDataList(list)
      setLoading(false);
    }
    fetchData();
  }, [queryLimit]);


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="text-2xl text-center font-semibold py-6">Offers</h2>
      <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {!loading &&
          dataList.map(({ id, data }) => <Card key={id} id={id} data={data} />)}
      </div>
      {dataList.length < 1 && <div>No Offers</div>}
      <div className="flex justify-center">
        {dataList.length >= queryLimit && <button onClick={()=>{setQueryLimit((prevStat)=> prevStat + 4)}} className="text-center font-medium mx-auto my-5 py-2 px-3 bg-white border border-gray-700 shadow-lg rounded-md hover:bg-slate-100 transition ease-in-out duration-100 cursor-pointer">
          Load more
        </button>}
      </div>
    </>
  );
};

export default Offers;
