import { createServer, Model } from "miragejs";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

/* For testing purpose */
createServer({
  timing: 4000,
  models: {
    restaurants: Model,
  },
  seeds(server) {
    server.create("restaurant", { id: 1, name: "Shwarma King", year: 2013 });
    server.create("restaurant", { id: 2, name: "Barbeque Nation", year: 2010 });
    server.create("restaurant", { id: 3, name: "NH 37", year: 2012 });
  },
  routes() {
    this.namespace = "api";

    this.get("/restaurants", (schema) => {
      return schema.all("restaurants");
    });
    this.get("/restaurants/:id", (schema, request) => {
      const id = request.params.id;
      return schema.find("restaurants", id);
    });
  },
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="restaurants/:restaurantId" element={<Restaurant />} />
    </Routes>
  );
}

export default App;
