import { async } from "@firebase/util";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuthButton from "../components/OAuthButton";

const ForgotPassword = () => {
  //usestate for handle inputs data
  const [email, setEmail] = useState("");

  //onchange functions for handle input changes during onChange event
  const onchange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  /** reset password functionality */
  async function resetPass() {
   
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success(`A email was sent to ${email}`);
  
    } catch (error) {
      console.log(error)
      toast.error("Ups! was not possible to send the email");
    }
  }

  return (
    <section className="py-5 px-10 md:px-24 lg:px-36 xl:px-44">
      <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
      <div className="md:grid md:grid-cols-2 md:space-x-10 xl:space-x-8 my-10">
        <img
          className="w-full rounded-lg max-w-6xl"
          src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2V5JTIwZG9vcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="Sign In "
        />
        <form className="relative w-full py-2 max-w-6xl">
          <input
            className="rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={onchange}
          />
          <div className="flex justify-between py-4">
            <div>
              <span>Don't have an account?</span>
              <Link
                to={"/sign-up"}
                className="px-1 text-red-500 cursor-pointer"
              >
                Register
              </Link>
            </div>
            <Link to={"/sign-in"} className="text-blue-500 cursor-pointer">
              Sign in instead
            </Link>
          </div>
          <button type="button" className="w-full px-5 py-2 shadow-md rounded-md text-white text-center uppercase font-medium bg-blue-500 hover:brightness-75"
          onClick={resetPass}>
            send reset password
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

export default ForgotPassword;
