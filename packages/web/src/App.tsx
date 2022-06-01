import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import routes from "./routes";

const App = () => {
  const elements = useRoutes(routes);

  return <Suspense fallback={<FallbackSpinner />}>{elements}</Suspense>;
};

export default App;
