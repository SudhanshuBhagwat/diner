import React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";
import { fetcher } from "../shared/fetcher";

interface Restaurant {
  id: number;
  name: string;
  ownerName: string;
  location: string;
  since: string;
  imageUrl: string;
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
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Restaurants</h1>
        <NavLink to="create">
          <button className="px-4 py-2 font-medium bg-green-200 rounded-md">
            Add Restaurant
          </button>
        </NavLink>
      </div>
      <ul className="flex flex-col space-y-2">
        {data.results.map((restaurant: Restaurant) => {
          return (
            <li
              key={restaurant.id}
              className="bg-gray-100 rounded-md overflow-hidden pb-2"
            >
              <NavLink to={`/restaurants/${restaurant.id}`}>
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="pb-2 w-full h-40 object-cover aspect-video"
                />
                <span className="text-md font-bold px-4">
                  {restaurant.name}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Restaurants;
