import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import db from "../firebase.config";
import { toast } from "react-toastify";

function OAuthButton() {
    
    /** navigate hook*/
    const navigate = useNavigate()

    async function googleOAuth(){
        try {
            /** call the getAuth function from firebase */
            const auth = getAuth()

            /**  call the google provider - google, could be facebook, apple, ect... */
            const provider = new GoogleAuthProvider()

            /** register the user through signUserWithPopup function - we can use signUserWithRedirect instead */
            const result = await signInWithPopup(auth, provider) //it gonna throw a popup of google singUp with google account
            const user = result.user

            /** add the user details in the db if is not exist */
            const docRef = doc(db, "users", user.uid)
            
            const docSnap = await getDoc(docRef)
            
            /** if user don't exits in the db, add him*/
            if(!docSnap.exists()){
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp()
                })
            }

            /** then redirect to home */
            navigate("/")

        } catch (error) {
            toast.error("At the moment we are not able to register, please try again")
            console.log(error.message)
        }
    }
    
    return (
        <button
        type="button"
        className="flex justify-center items-center w-full px-5 py-2 shadow-md rounded-md text-white text-center uppercase font-medium bg-red-500 hover:brightness-75"
        onClick={googleOAuth}>
            <FcGoogle className="bg-white rounded-full mx-2" />
            <span>Continue with google</span>
        </button>
    );
}

export default OAuthButton;
