import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useSignIn, useSignOut } from "./contexts/UserContext";
import { setupFirebase } from "./lib/firebase";

const Root = () => {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  useEffect(() => {
    setupFirebase();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        signIn(user);
      } else {
        signOut();
      }
    });
  }, []);

  return (
    <main>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </main>
  );
};

export default Root;
