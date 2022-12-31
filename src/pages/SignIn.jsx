import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuthButton from "../components/OAuthButton";

const SignIn = () => {
  /** usestate for handle inputs data */
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const { email, password } = inputData; // destructing the object {} to retrieve individuals values

  /** useNavigate */
  const navigate = useNavigate();

  /** onchange functions for handle input changes during onChange event */
  const onchange = (e) => {
    setInputData((preStat) => ({
      ...preStat,
      [e.target.id]: e.target.value,
    }));
    console.log(`Your email: ${email} and Your password: ${password}`);
  };

  /** Sign in with email and password provider */
  async function signIn_button() {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error)
      toast.error(
        "You have no access to continue, please consider to check your credential or register"
      );
    }
  }

  return (
    <section className="py-5 px-10 md:px-24 lg:px-36 xl:px-44">
      <h1 className="text-3xl font-bold text-center"> Sign In</h1>
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
            {!passwordVisibility && (
              <AiFillEyeInvisible onClick={() => setPasswordVisibility(true)} />
            )}
            {passwordVisibility && (
              <AiFillEye onClick={() => setPasswordVisibility(false)} />
            )}
          </div>
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
            <Link
              to={"/forgot-password"}
              className="text-blue-500 cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className="w-full px-5 py-2 shadow-md rounded-md text-white text-center uppercase font-medium bg-blue-500 hover:brightness-75"
            onClick={(e) => {
              e.preventDefault();
              signIn_button();
            }}
          >
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

export default SignIn;
