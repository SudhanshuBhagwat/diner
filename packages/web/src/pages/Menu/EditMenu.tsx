import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Item from "../../components/Item";
import Spinner from "../../components/Spinner";
import { API_BASE_URL } from "../../constants";
import { fetcher } from "../../shared/fetcher";
import CreateItem from "../Item/CreateItem";

interface Props {
  children?: React.ReactNode;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  veg: boolean;
}

const EditMenu: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [params] = useSearchParams();
  const menuId = params.get("menuId");
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
      return fetch(`${API_BASE_URL}/menus/${menuId}`, {
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
    }
  );

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    return await mutateAsync(data, {
      onSuccess: () => {
        navigate(`/menus?menusId=${menuId}`);
      },
    });
  };

  if (queryIsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!queryIsLoading && queryError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="font-bold text-white px-4 py-2 bg-red-500 rounded-md">
          An unexpected error occurred
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col px-4 gap-2">
      <h2 className="text-xl font-semibold">Edit Menu</h2>
      {isError && (
        <span className="text-center py-2 bg-red-400 text-white font-medium rounded-md">{`${error}`}</span>
      )}
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">
        <div className="h-full flex flex-col flex-1 gap-3">
          <label className="flex flex-col text-base font-medium">
            Name
            <input
              {...register("name", {
                required: true,
                value: data.results.name,
              })}
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
                data.results.Item.map((item: Item) => (
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

      <CreateItem
        isOpen={isModalOpen}
        onClose={(value) => {
          setIsModalOpen(value);
          if (!value) {
            refetch();
          }
        }}
        menuId={Number(menuId)}
      />
    </div>
  );
};

export default EditMenu;
