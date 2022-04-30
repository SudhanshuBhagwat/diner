import React from "react";
import { IndexScreen } from "../App";
import Auth from "../pages/Auth";
import Scan from "../pages/Scan";

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
