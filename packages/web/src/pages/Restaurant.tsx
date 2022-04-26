import { useParams } from "react-router-dom";
import React from "react";
import Spinner from "../components/Spinner";

const fetcher = ({ queryKey }: { queryKey: any }) => {
  return fetch(`/api/${queryKey.join("/")}`)
    .then((res) => res.json())
    .catch((error) => error);
};

const Restaurant = () => {
  const { restaurantId } = useParams();
  return (
    <div className="h-full w-full px-4 py-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Shwarma King</h2>
        <span className="text-gray-400">Since 2016</span>
      </div>
    </div>
  );
};

export default Restaurant;
