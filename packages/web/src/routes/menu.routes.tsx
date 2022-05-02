import React from "react";
import CreateMenu from "../pages/CreateMenu";

const menuRoutes = {
  path: "menus",
  children: [
    {
      path: "create",
      element: <CreateMenu />,
    },
  ],
};

export default menuRoutes;
