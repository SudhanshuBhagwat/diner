import { QrcodeIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const AppBar: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <nav className="p-4 flex items-center justify-between">
      <span className="font-bold text-2xl">Diner</span>
      <QrcodeIcon
        onClick={() => navigate("/scan")}
        className="h-6 w-6 text-gray-600"
      />
    </nav>
  );
};

export default AppBar;
