import React, { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Spinner from "./components/Spinner";
import routes from "./routes";

export const IndexScreen = lazy(() => import("./pages/Home"));
export const Page404Screen = lazy(() => import("./pages/Page404"));

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
