import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../lib/firebase";

const Auth = () => {
  const handleGooglSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();

    signInWithRedirect(auth, provider);
  };

  const handleSignOut = () => {
    const auth = useAuth();
    signOut(auth);
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col justify-center items-center space-y-2">
      <h1 className="text-2xl font-bold">Sign In to Diner</h1>
      <button
        onClick={handleGooglSignIn}
        className="px-4 py-2 bg-gray-200 rounded-md font-bold"
      >
        Sign In with <span className="text-blue-400 ml-1">Google</span>
      </button>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-400 rounded-md font-bold text-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Auth;
