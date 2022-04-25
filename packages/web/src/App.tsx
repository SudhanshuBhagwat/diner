import { useEffect, useState } from "react";
import { setupFirebase } from "./lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Routes, Route, NavLink } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setupFirebase();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <div>User: {user?.displayName}</div>
      <NavLink to="/auth">Auth</NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="restaurants/:restaurantId" element={<Restaurant />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
