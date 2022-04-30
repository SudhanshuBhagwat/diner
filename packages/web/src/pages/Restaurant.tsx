import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { fetcher } from "../shared/fetcher";
import { PencilAltIcon } from "@heroicons/react/outline";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
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
        <PencilAltIcon
          onClick={() => {
            navigate(`/restaurants/edit/${restaurantId}`);
          }}
          className="w-6 h-6 text-gray-400"
        />
      </div>
      <div className="flex flex-col flex-1 gap-2 mt-2">
        <img
          className="object-cover rounded-md aspect-video shadow-md my-1"
          src={data.results.imageURL}
        />
        <label className="font-medium text-lg">
          Owner: <span className="text-gray-600">{data.results.ownerName}</span>
        </label>
        <label className="font-medium text-lg">
          Since: <span className="text-gray-600">{data.results.since}</span>
        </label>
        <label className="font-medium text-lg">
          Location:{" "}
          <span className="text-gray-600">{data.results.location}</span>
        </label>
      </div>
    </div>
  );
};

export default Restaurant;
