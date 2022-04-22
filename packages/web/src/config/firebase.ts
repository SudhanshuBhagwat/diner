import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  Auth,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_APP_ID),
  measurementId: String(import.meta.env.VITE_MEASUREMENT_ID),
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBR--hTAtjV0yECm22Piya_nw29dRhPRyc",
//   authDomain: "diner-e1c3e.firebaseapp.com",
//   projectId: "diner-e1c3e",
//   storageBucket: "diner-e1c3e.appspot.com",
//   messagingSenderId: "10650564560",
//   appId: "1:10650564560:web:e69c1cb59d998cfe056bd5",
//   measurementId: "G-0Q4NBRRGGG",
// };

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  return { firebaseApp, auth, isConfigured };
}

function connectToEmulators({ auth }: { auth: Auth }) {
  if (location.hostname === "localhost" || location.host === "192.168.1.17") {
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured) {
    connectToEmulators(services);
  }
  return services;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const { auth } = getFirebase();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      console.log(`User: ${user}`);

      setUser(user);
    });
  }, []);

  return user;
}
