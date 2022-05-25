import { ChevronLeftIcon, ShareIcon } from "@heroicons/react/outline";
import React from "react";
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = () => {
  const stateIdx = window.history.state.idx;
  const navigate = useNavigate();
  const location = useLocation();
  const routes = matchRoutes([{ path: "restaurants/:id" }], location) || [];

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
        <div className={`${routes.length > 0 ? "" : "mt-14"} h-screen`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
