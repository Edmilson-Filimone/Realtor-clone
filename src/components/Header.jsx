import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"


const Header = () => {
  const auth = getAuth()

  const navigate = useNavigate() //handle the navegations links
  
  const location = useLocation() //handle the url route details - minuto 1h23min 

  const currentLocation = (path) => {
    if(location.pathname === path){
      return true
    }
  }

  /** states and useEffect for dynamically change sign-in item by profile in the navbar*/
  const [label, setLabel] = useState("Sign in")
  const [link, setLink] = useState("/sign-in")

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        setLabel("Profile")
        setLink("/profile")
      } else{
        setLabel("Sign in")
        setLink("sign-in")
      }
    })
  },[label, link])

  return (
    <div className="border-b bg-white shadow-sm sticky top-0 z-40">
      <header className="flex justify-between px-3 mx-auto max-w-7xl items-center">
        <div>
          <img className="h-5 cursor-pointer" src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor logo" onClick={() => navigate("/") }/>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li className={`text-sm font-semibold text-gray-400 py-3 cursor-pointer ${currentLocation("/") && "text-black border-b-[3px] border-b-red-500"}`} onClick={()=> navigate("/")} >Home</li>

            <li className={`text-sm font-semibold text-gray-400 py-3 cursor-pointer ${currentLocation("/offers") && "text-black border-b-[3px] border-b-red-500"}`} onClick={()=> navigate("/offers")}>Offers</li>
 
            <li className={`text-sm font-semibold text-gray-400 py-3 cursor-pointer ${(currentLocation("/sign-in")|| currentLocation("/profile"))
             && "text-black border-b-[3px] border-b-red-400"}`}
              onClick={()=> navigate(link)}>{label}</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header


//useLocation() --> return a object that contain information of the current url location
//for example useLocation().pathname --> return the name of the current ulr
//we use this to conditionally style our nav item, when you are the selected menu page it gona add a 
//border-bottom red to the menu