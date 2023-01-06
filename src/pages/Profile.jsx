import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config.js";
import Card from "../components/Card.jsx";
import { uuidv4 as uuid } from "@firebase/util";
import {FcHome} from "react-icons/fc"
import { data } from "autoprefixer";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  /** States */
  const [inputData, setInputData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = inputData;

  /** onChange - handle input form data */
  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  /** handleClick - click event to enable or disable edit mode on the input name */
  const [enableEdit, setEnableEdit] = useState(false);

  const handleClick = () => {
    setEnableEdit((prevState) => !prevState);
  };
  22;

  /** handleUpdate - Update the info on firebase authentication and firestore db */
  async function handleUpdate() {
    try {
      if (name !== auth.currentUser.displayName) {
        //update in auth service
        await updateProfile(auth.currentUser, { displayName: name });
      }

      //update in firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { displayName: name });

      toast.success("User profile updated");
    } catch (error) {
      toast.error("Failed to update");
    }
  }

  /** Sign Out function */
  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  /*Edit and Delete function that we gonna pass to the card component as parameter*/
  
  /*OnEdit function**/
  const onEdit = (itemID)=>{
    navigate(`ListingEdit/${itemID}`)
  }

  let updateData = []
  /*OnDelete function**/
  const onDelete = async (itemID) => {
    if(confirm("You are sure?")){
      const docRef = doc(db, "listings", itemID)
      await deleteDoc(docRef)
      //updating the state in order to rerender the cards without the item deleted
      //i tried to use filter() but it was returning a empty array
      let data = []
      dataCollection.forEach((item)=>{
        if(item.id !== itemID){
          data.push(item)
        }
      })
      setDataCollection(data)
      toast.success("Item delete successfully")
    }
  }


  const [dataCollection, setDataCollection] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const dbRef = collection(db, "listings");
      const q = query(
        dbRef,
        where("user", "==", auth.currentUser.uid),
        orderBy("timeStamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        setDone(true);
        setDataCollection((preStat) => [
          ...preStat,
          { id: doc.id, data: doc.data() },
        ]);
      });
    }
    fetchData();
  }, [auth.currentUser.uid]);

  console.log(dataCollection);

  return (
    <>
      <section className="py-5 px-10 mx-auto md:px-24 lg:px-36 xl:px-44">
        <h2 className="text-3xl font-semibold text-center">My Profile</h2>
        <form className="relative w-full mx-auto py-2 max-w-6xl">
          <input
            type="text"
            id="name"
            value={name}
            className="rounded-md"
            onChange={onChange}
            disabled={!enableEdit} //start with the input disabled. EnableEdit by default is false and the result of the expression is true because of ! (not operator) disabled = true
          />
          <input
            type="email"
            id="email"
            value={email}
            className="rounded-md"
            disabled
          />
        </form>
        <div className="flex justify-between text-sm md:text-base whitespace-nowrap max-w-6xl mx-auto">
          <div>
            Do you want to change your name?
            <div
              onClick={handleClick}
              className="inline text-red-600 cursor-pointer hover:brightness-75"
            >
              {!enableEdit && <span>Edit</span>}
              {enableEdit && <span onClick={handleUpdate}>Apply changes</span>}
            </div>
          </div>
          <span
            className="text-blue-600 cursor-pointer hover:brightness-75"
            onClick={signOut}
          >
            Sign Out
          </span>
        </div>
        <button className="flex justify-center items-center w-full max-w-6xl mx-auto px-3 py-2 my-4 text-center text-white font-medium uppercase bg-blue-500 shadow-md rounded duration-150  ease-in-out hover:brightness-90">
          <span className="text-base p-1 mr-2 bg-red-300 rounded-full"><FcHome/></span>
          <Link to="/create-listing">sell or rent your home</Link>
        </button>
        <h2 className={"text-2xl text-center font-semibold py-5"}>My Listing</h2>
        <div className="md:grid gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {
        done && dataCollection.map((doc) => (
        <div>
        <Card key={uuid()} id={doc.id} data={doc.data} onEdit={onEdit} onDelete={onDelete}/>
        </div>
        ))
        }
        </div>
          
      </section>
    </>
  );
};

export default Profile;
