import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import routes from "./routes";

export const IndexScreen = lazy(() => import("./pages/Home"));
export const Page404Screen = lazy(() => import("./pages/Page404"));

const App = () => {
  const elements = useRoutes(routes);

  return <Suspense fallback={<FallbackSpinner />}>{elements}</Suspense>;
};

export default App;
