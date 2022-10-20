import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        setCheckingStatus(false)
      }
    });
  },[isLogged]);

  return {isLogged, checkingStatus};
};

export default useAuthStatus;
