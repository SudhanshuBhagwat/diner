import React, { lazy, Suspense } from "react";
import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import Spinner from "./components/Spinner";
import Auth from "./pages/Auth";
import CreateRestaurant from "./pages/CreateRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import Restaurant from "./pages/Restaurant";
import Restaurants from "./pages/Restaurants";

const IndexScreen = lazy(() => import("./pages/Home"));
const Page404Screen = lazy(() => import("./pages/Page404"));

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <nav className="p-4 flex items-center justify-between">
        <span className="font-bold text-2xl">Diner</span>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexScreen />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "restaurants",
        children: [
          {
            path: "",
            element: <Restaurants />,
          },
          {
            path: ":restaurantId",
            element: <Restaurant />,
          },
          {
            path: "create",
            element: <CreateRestaurant />,
          },
          {
            path: "edit/:restaurantId",
            element: <EditRestaurant />,
          },
        ],
      },
      {
        path: "*",
        element: <Page404Screen />,
      },
    ],
  },
];

function App() {
  const elements = useRoutes(routes);

  return <Suspense fallback={<FallbackSpinner />}>{elements}</Suspense>;
}

function FallbackSpinner() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}

export default App;
