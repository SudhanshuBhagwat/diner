import React from "react";
import CreateMenu from "../pages/CreateMenu";
import EditMenu from "../pages/Menu/EditMenu";
import Menus from "../pages/Menu/Menus";

const menuRoutes = {
  path: "menus",
  children: [
    {
      index: true,
      element: <Menus />,
    },
    {
      path: "create",
      element: <CreateMenu />,
    },
    {
      path: "edit",
      element: <EditMenu />,
    },
  ],
};

export default menuRoutes;
