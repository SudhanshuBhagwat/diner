import React from "react";
import { RouteObject } from "react-router-dom";
import { Page404Screen } from "../App";
import Layout from "../components/Layout";
import homeRoutes from "./home.routes";
import restaurntRoutes from "./restaurant.routes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      ...homeRoutes,
      restaurntRoutes,
      {
        path: "*",
        element: <Page404Screen />,
      },
    ],
  },
];

export default routes;
