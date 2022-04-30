import React from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
