import { useState } from "react";

const SignIn = () => {

  //usestate for handle inputs data
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const {email, password} = inputData
  
  //onchange functions for handlr inputd changes
  const onchange = (e) => {
    setInputData((preStat) => ({
      ...preStat,
      [e.target.id]: e.target.value,
    }));
    console.log(`Your email: ${email} and Your password: ${password}`)
  };

  return (
    <section className="py-5 px-10 md:px-24 lg:px-36 xl:px-44">
      <h1 className="text-3xl font-bold text-center"> Sign In</h1>
      <div className="md:grid md:grid-cols-2 md:space-x-10 xl:space-x-8 my-10">
        <img
          className="w-full rounded-lg max-w-6xl"
          src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2V5JTIwZG9vcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="Sign In "
        />
        <form className="w-full py-2 max-w-6xl">
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
            className="rounded-md"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={onchange}
          />
          <div className="flex justify-between py-4">
            <div>
              <span>Don't have an account?</span>
              <span className="px-1 text-red-500 cursor-pointer">Register</span>
            </div>
            <span className="text-blue-500 cursor-pointer">
              Forgot password?
            </span>
          </div>
          <button className="w-full px-5 py-2 shadow-md text-white text-center uppercase font-semibold bg-blue-500">
            Sign In
          </button>
          <div className="flex items-center py-4">
            <div className="w-full border-b-2 border-gray-200"></div>
            <span className="px-3 uppercase">or</span>
            <div className="w-full border-b-2 border-gray-200"></div>
          </div>
          <button className="w-full px-5 py-2 shadow-md text-white text-center uppercase font-semibold bg-red-500">
            Continue with google
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
