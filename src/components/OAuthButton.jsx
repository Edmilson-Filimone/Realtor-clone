import React from "react";
import { FcGoogle } from "react-icons/fc";

function OAuthButton() {
    return (
        <button className="flex justify-center items-center w-full px-5 py-2 shadow-md rounded-md text-white text-center uppercase font-medium bg-red-500 hover:brightness-75">
            <FcGoogle className="bg-white rounded-full mx-2" />
            <span>Continue with google</span>
        </button>
    );
}

export default OAuthButton;
