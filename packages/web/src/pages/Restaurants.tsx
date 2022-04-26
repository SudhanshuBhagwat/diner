import React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";
import { fetcher } from "../shared/fetcher";

interface Restaurant {
  id: number;
  name: string;
  createdAt: string;
}

const Restaurants = () => {
  const { data, error, isLoading } = useQuery("restaurants", fetcher);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="font-bold text-white px-4 py-2 bg-red-500 rounded-md">
          An unexpected error occurred
        </span>
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-2">Restaurants</h1>
      <ul className="flex flex-col space-y-2">
        {data.results.map((restaurant: Restaurant) => {
          return (
            <li
              key={restaurant.id}
              className="py-4 px-4 bg-gray-200 rounded-md"
            >
              <NavLink to={`/restaurants/${restaurant.id}`}>
                <span className="text-md font-bold">{restaurant.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Restaurants;
