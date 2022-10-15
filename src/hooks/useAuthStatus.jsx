import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      }
    });
  });

  return isLogged;
};

export default useAuthStatus;
