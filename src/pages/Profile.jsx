import { getAuth } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router"

const Profile = () => {
  
  const auth = getAuth()
  
  const [inputData, setInputData] = useState({name:auth.currentUser.displayName, email:auth.currentUser.email})
  const {name, email} = inputData

  const navigate = useNavigate()

  /** Sign Out function */
  const signOut = () => {
    auth.signOut()
    navigate("/")   
  }

  return (
    <>
    <section className="py-5 px-10 md:px-24 lg:px-36 xl:px-44">
      <h2 className="text-3xl font-semibold text-center">My Profile</h2>
      <form className="relative w-full py-2 max-w-6xl">
        <input type="text" id="name" value={name} className="rounded-md" readOnly />
        <input type="email" id="email" value={email} className="rounded-md" readOnly/>
      </form>
      <div className="flex justify-between text-sm md:text-base whitespace-nowrap">
        <p>Do you want to change your name?<span className="text-red-600 cursor-pointer hover:brightness-75"> Edit </span></p>
        <span className="text-blue-600 cursor-pointer hover:brightness-75" onClick={signOut}>Sign Out</span>
      </div>
    </section>
    </>
  )
}

export default Profile