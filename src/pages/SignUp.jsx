import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link, useNavigate} from "react-router-dom";
import OAuthButton from "../components/OAuthButton";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import db from "../firebase.config.js"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {toast } from 'react-toastify';

const SignUp = () => {

  //usestate for handle inputs data
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [inputData, setInputData] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = inputData  //destructing the object {} to retrieve individuals values

  const navigate = useNavigate()

  //onchange functions for handle input changes during onChange event
  const onchange = (e) => {
    setInputData((preStat) => ({
      ...preStat,
      [e.target.id]: e.target.value,
    }));
    console.log(`Your name: ${name}, email: ${email} and Your password: ${password}`)
  };

  //Function to create the new user and save the data of the user on user database - linked to the form button
  //All the info of the user including password are save in the auth service and then only the name email and time are save in the user db.

  async function createUser() {
    const auth = getAuth();
    try {
      //creating the user in the auth service
      const userCredential = await createUserWithEmailAndPassword(auth, email, password) //this line is responsible to register the new user
      updateProfile(auth.currentUser, { displayName: name }) //(update) seting the name
      const user = userCredential.user 
      console.log(user)
      //save the user info (name, email and time in the firestore db)
      const docRef = await addDoc(collection(db, "users"), { name: name, email: email, timeStamp: serverTimestamp() })
      navigate("/")
    }
    catch (error) {
      console.log(error.message)
      toast.error(`${error.message}`);
    }

  }

  return (
    <section className="py-5 px-10 md:px-24 lg:px-36 xl:px-44">
      <h1 className="text-3xl font-bold text-center"> Sign Up</h1>
      <div className="md:grid md:grid-cols-2 md:space-x-10 xl:space-x-8 my-10">
        <img
          className="w-full rounded-lg max-w-6xl"
          src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2V5JTIwZG9vcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="Sign In "
        />
        <form className="relative w-full py-2 max-w-6xl">
          <input
            className="rounded-md"
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={onchange}
          />
          <input
            className="rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={onchange}
          />
          <input
            className="relative rounded-md"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={onchange}
          />
          <div className="absolute top-[87px] right-3 text-gray-400">
            {!passwordVisibility && (<AiFillEyeInvisible onClick={() => setPasswordVisibility(true)} />)}
            {passwordVisibility && (<AiFillEye onClick={() => setPasswordVisibility(false)} />)}
          </div>
          <div className="flex justify-between py-4">
            <div>
              <span>Have an account?</span>
              <Link to={"/sign-in"} className="px-1 text-red-500 cursor-pointer">Sign in</Link>
            </div>
            <Link to={"/forgot-password"} className="text-blue-500 cursor-pointer">
              Forgot password?
            </Link>
          </div>
          <button className="w-full px-5 py-2 shadow-md rounded-md text-white text-center uppercase font-medium bg-blue-500 hover:brightness-75" onClick={(e) => {
            e.preventDefault();
            createUser();
          }}>
            Sign In
          </button>
          <div className="flex items-center py-4">
            <div className="w-full border-b-2 border-gray-200"></div>
            <span className="px-3 uppercase">or</span>
            <div className="w-full border-b-2 border-gray-200"></div>
          </div>
          <OAuthButton />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
