import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const fetcher = ({ queryKey }: { queryKey: any }) => {
  return fetch(`/api/${queryKey.join("/")}`)
    .then((res) => res.json())
    .catch((error) => error);
};

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { data, error, isLoading } = useQuery(
    ["restaurants", restaurantId],
    fetcher
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="font-bold text-white px-4 py-2 bg-red-500 rounded-md">
          An unexpected error occurred
        </span>
      </div>
    );
  }

  return (
    <div className="h-screen w-full px-4 py-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{data.restaurants.name}</h2>
        <span className="text-gray-400">Since {data.restaurants.year}</span>
      </div>
    </div>
  );
};

export default Restaurant;
