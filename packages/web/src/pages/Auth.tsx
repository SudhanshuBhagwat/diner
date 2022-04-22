import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirebase } from "../config/firebase";

const Auth = () => {
  const navigate = useNavigate();
  const { auth } = getFirebase();

  useEffect(() => {
    async function getUser() {
      const result = await getRedirectResult(auth);
      console.log({ result });

      if (result) {
        navigate("/");
      }
    }
    getUser();
  }, [navigate]);

  function handleGooglSignIn() {
    signInWithRedirect(auth, new GoogleAuthProvider());
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center space-y-2">
      <h1 className="text-2xl font-bold">Sign In to Diner</h1>
      <button
        onClick={handleGooglSignIn}
        className="px-4 py-2 bg-gray-200 rounded-md font-bold"
      >
        Sign In with <span className="text-blue-400 ml-1">Google</span>
      </button>
    </div>
  );
};

export default Auth;
