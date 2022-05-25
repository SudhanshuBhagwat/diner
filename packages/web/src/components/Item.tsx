import React from "react";
import { Item as ItemType } from "../pages/Menu/EditMenu";

interface Props {
  children?: React.ReactNode;
  item: ItemType;
}

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div className="flex bg-gray-100 rounded-md overflow-hidden space-x-2">
      <img
        className="w-20 h-16 aspect-video object-cover "
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-evenly">
          <h4 className="font-medium">{item.name}</h4>
          <span>{item.price}</span>
        </div>
        <span
          className={`w-4 h-4 rounded-full mr-4 ${
            item.veg ? "bg-green-600" : "bg-red-600"
          }`}
        />
      </div>
    </div>
  );
};

export default Item;
