import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Item from "../components/Item";
import Spinner from "../components/Spinner";
import { API_BASE_URL } from "../constants";
import { fetcher } from "../shared/fetcher";
import { Item as ItemType } from "./Menu/EditMenu";

interface Props {
  children?: React.ReactNode;
}

const CreateMenu: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<number>(999999);
  const [params] = useSearchParams();
  const restaurantId = params.get("restaurantId");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {
    data,
    error: queryError,
    isLoading: queryIsLoading,
    refetch,
  } = useQuery(["menus", menuId], fetcher);

  const { mutateAsync, isLoading, error, isError } = useMutation(
    (data: FieldValues) => {
      return fetch(`${API_BASE_URL}/menus?restaurantId=${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }).catch((error: Error) => {
        throw new Error(error.message);
      });
    },
    {
      onSuccess: async (data) => {
        const { results } = await data.json();
        setMenuId(results.id);
        // navigate(`/menus?restaurantId=${restaurantId}`);
      },
    }
  );

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    return await mutateAsync(data);
  };

  return (
    <div className="h-full flex flex-col px-4 gap-2">
      <h2 className="text-xl font-semibold">Create Menu</h2>
      {isError && (
        <span className="text-center py-2 bg-red-400 text-white font-medium rounded-md">{`${error}`}</span>
      )}
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">
        <div className="h-full flex flex-col flex-1 gap-3">
          <label className="flex flex-col text-base font-medium">
            Name
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Menu Name"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Items</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 font-medium bg-green-200 rounded-md"
              >
                Add Item
              </button>
            </div>
            <div className="flex flex-col space-y-2 mt-2">
              {data.results.Item &&
                data.results.Item.map((item: ItemType) => (
                  <Item key={item.id} item={item} />
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center px-4 py-2 font-medium bg-green-200 rounded-md mb-4"
          >
            {isLoading ? <Spinner /> : "Save Menu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMenu;
