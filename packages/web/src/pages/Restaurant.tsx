import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Spinner from "../components/Spinner";
import { useQuery } from "react-query";
import { fetcher } from "../shared/fetcher";
import { PencilAltIcon } from "@heroicons/react/outline";
import { Item } from "./Menu/EditMenu";

export interface Menu {
  id: number;
  name: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
  Item?: Item[];
}

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
          src={data.results.imageUrl}
        />
        <label className="font-semibold text-lg">
          Owner: <span className="text-gray-600">{data.results.ownerName}</span>
        </label>
        <label className="font-semibold text-lg">
          Since: <span className="text-gray-600">{data.results.since}</span>
        </label>
        <label className="font-semibold text-lg">
          Location:{" "}
          <span className="text-gray-600">{data.results.location}</span>
        </label>
        <div className="pb-4">
          <h2 className="font-semibold mb-2 text-lg">Menu's</h2>
          <div className="divide-y divide-gray-200 space-y-2">
            {data.results.Menu.map((menu: Menu) => {
              return (
                <div key={menu.id}>
                  <h3 className="font-medium">{menu.name}</h3>
                  {menu.Item && menu.Item?.length > 0 ? (
                    <ul>
                      {menu.Item?.map((item) => (
                        <li className="ml-4" key={item.id}>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">No Items in menu</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
