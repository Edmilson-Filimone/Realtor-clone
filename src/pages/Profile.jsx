import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import db from "../firebase.config.js"

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
  const [enableEdit, setEnableEdit] = useState(false) 

  const handleClick = () => {setEnableEdit((prevState) => !prevState )}

  /** handleUpdate - Update the info on firebase authentication and firestore db */
  async function handleUpdate() {
    try {
      if(name !== auth.currentUser.displayName){
        //update in auth service
        await updateProfile(auth.currentUser, {displayName: name})}
        
        //update in firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {displayName: name})

        toast.success("User profile updated")
    
    } catch (error) {
      toast.error("Failed to update")
    }

  }
  
  /** Sign Out function */
  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <section className="py-5 px-10 md:px-24 lg:px-36 xl:px-44">
        <h2 className="text-3xl font-semibold text-center">My Profile</h2>
        <form className="relative w-full py-2 max-w-6xl">
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
        <div className="flex justify-between text-sm md:text-base whitespace-nowrap">
          <div>
            Do you want to change your name?
            <div onClick={handleClick} className="inline text-red-600 cursor-pointer hover:brightness-75">
             {!enableEdit && <span>Edit</span>}
             {enableEdit &&  <span onClick={handleUpdate}>Apply changes</span>}
            </div>
          </div>
          <span
            className="text-blue-600 cursor-pointer hover:brightness-75"
            onClick={signOut}
          >
            Sign Out
          </span>
        </div>
      </section>
    </>
  );
};

export default Profile;
