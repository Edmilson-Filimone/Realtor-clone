import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";

function ContactForm({ data }) {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", data.user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }

    fetchData();
  }, [data.user]);

  /**OnChange*/
  const onChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  /**OnSubmit*/
  const onSubmit = (e) => {};

  return (
    <>
      <div className="my-4">
        {userData.name && (
          <p className="py-4">{`Contact ${userData.name} for the ${data.name}?`}</p>
        )}
        <form>
          <textarea
            className="w-full h-[100px] rounded-md active:border-blue-500"
            name="message"
            id="message"
            onChange={onChange}
            value={message}
          ></textarea>
          <a href={`mailto:${userData.email}?subject=${userData.name}&body=${message}`}>
              <button
                className="w-full shadow-md rounded-md mt-5 py-2 bg-blue-600 text-white text-center font-semibold uppercase transition ease-in-out duration-100 hover:bg-blue-700"
              >
                Send Message
              </button>
          </a>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
