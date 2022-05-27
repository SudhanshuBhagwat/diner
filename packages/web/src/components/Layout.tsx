import { ChevronLeftIcon, ShareIcon } from "@heroicons/react/outline";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useMutation } from "react-query";
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { API_BASE_URL } from "../constants";
import { useAuthState, useFirebaseAuth } from "../contexts/UserContext";
import { setupFirebase } from "../lib/firebase";
import Spinner from "./Spinner";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const stateIdx = window.history.state.idx;
  const navigate = useNavigate();
  const location = useLocation();
  const routes =
    matchRoutes(
      [{ path: "restaurants/:id" }, { path: "" }, { path: "/auth" }],
      location
    ) || [];

  const { signIn, signOut } = useFirebaseAuth();
  const { state } = useAuthState();

  async function postUserData(data: any) {
    fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        if (result.status === 201) {
          setIsLoading(false);
          navigate("/", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/auth", {
          replace: true,
        });
      });
  }

  useEffect(() => {
    setupFirebase();
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        signIn(user);
        postUserData({
          name: user.displayName,
          uid: user.uid,
        });
      } else {
        signOut();
        setIsLoading(false);
        navigate("/auth", {
          replace: true,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        {stateIdx > 0 && (
          <div className="absolute top-0 flex justify-between items-center w-full p-4">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 bg-gray-200/80 rounded-md p-2 text-black"
            >
              <ChevronLeftIcon />
            </button>
            {routes.length > 0 && (
              <button className="w-8 h-8 bg-gray-200/60 rounded-md p-2 text-black">
                <ShareIcon />
              </button>
            )}
          </div>
        )}
        <div className={`${routes.length > 0 ? "" : "pt-14"} h-full`}>
          {isLoading ? (
            <div className="h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <Outlet context={state} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
