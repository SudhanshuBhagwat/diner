import { PlusIcon } from "@heroicons/react/outline";
import React from "react";
import { Item } from "../Menu/EditMenu";

interface Props {
  item: Item;
  type?: "large" | "minimal";
}

const ItemView: React.FC<React.PropsWithChildren<Props> & Props> = ({
  item,
  type = "large",
}) => {
  return (
    <div className="bg-gray-50 rounded-md inline-block overflow-hidden shadow-md">
      <div className="relative">
        <img
          src={item.imageUrl}
          className="aspect-square object-cover w-40 p-1 rounded-xl"
        />
        <div
          className={`w-3 h-3 rounded-full absolute ${
            item.veg ? "bg-green-400" : "bg-red-400"
          } top-3 right-3`}
        ></div>
      </div>
      <div className="px-2 py-2 space-y-1">
        <h2 className="font-semibold text-sm">{item.name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-sm">{item.price}₹</span>
          <button className="bg-blue-400 rounded-md p-1 text-white">
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemView;
