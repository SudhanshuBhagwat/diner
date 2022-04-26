import { useParams } from "react-router-dom";
import React from "react";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { fetcher } from "../shared/fetcher";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { data, error, isLoading } = useQuery(
    ["restaurants", restaurantId],
    fetcher
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="font-bold text-white px-4 py-2 bg-red-500 rounded-md">
          An unexpected error occurred
        </span>
      </div>
    );
  }

  return (
    <div className="h-full w-full px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{data.results.name}</h2>
        <span className="text-gray-400">Since 2016</span>
      </div>
    </div>
  );
};

export default Restaurant;
