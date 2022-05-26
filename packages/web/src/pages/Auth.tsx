import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../lib/firebase";

const Auth = () => {
  const handleGooglSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();
    signInWithRedirect(auth, provider);
  };

  const handleEmailPasswordSignIn = () => {};

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Sign In to Diner</h1>
      <form className="flex flex-col flex-start space-y-4">
        <label className="flex flex-col">
          Email
          <input
            type="email"
            className="border border-gray-400 rounded-md px-4 py-2"
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            type="password"
            className="border border-gray-400 rounded-md px-4 py-2"
          />
        </label>
        <button
          onClick={handleEmailPasswordSignIn}
          className="px-4 py-2 bg-gray-200 rounded-md font-bold"
        >
          Sign In
        </button>
      </form>
      <p className="text-sm my-4">Or</p>
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
