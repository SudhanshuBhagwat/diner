import { LogoutIcon, QrcodeIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/userSlice";

interface Props {
  children?: React.ReactNode;
}

const AppBar: React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="p-4 flex items-center justify-between">
      <span className="font-bold text-2xl">Diner</span>
      <div className="flex space-x-4">
        <QrcodeIcon
          onClick={() => navigate("/scan")}
          className="h-6 w-6 text-gray-600"
        />
        <LogoutIcon
          onClick={() => dispatch(signOut())}
          className="h-6 w-6 text-gray-600"
        />
      </div>
    </nav>
  );
};

export default AppBar;
