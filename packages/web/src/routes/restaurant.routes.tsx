import React from "react";
import CreateRestaurant from "../pages/CreateRestaurant";
import EditRestaurant from "../pages/EditRestaurant";
import Restaurant from "../pages/Restaurant";
import Restaurants from "../pages/Restaurants";

const restaurntRoutes = {
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
};

export default restaurntRoutes;
