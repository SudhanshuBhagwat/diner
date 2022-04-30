import React, { lazy } from "react";
import Auth from "../pages/Auth";
import Scan from "../pages/Scan";

const IndexScreen = lazy(() => import("../pages/Home"));

export default [
  {
    index: true,
    element: <IndexScreen />,
  },
  {
    path: "scan",
    element: <Scan />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
];
