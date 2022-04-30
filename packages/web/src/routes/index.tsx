import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import homeRoutes from "./home.routes";
import restaurntRoutes from "./restaurant.routes";

const Page404Screen = lazy(() => import("../pages/Page404"));

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
