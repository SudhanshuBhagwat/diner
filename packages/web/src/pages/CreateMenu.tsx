import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { API_BASE_URL } from "../constants";
import { fetcher } from "../shared/fetcher";
import { Menu } from "./Restaurant";

interface Props {
  children?: React.ReactNode;
}

const CreateMenu: React.FC<Props> = () => {
  const [params] = useSearchParams();
  const restaurantId = params.get("restaurantId");
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: menuData,
    error: menuError,
    isLoading: menuIsLoading,
    refetch,
  } = useQuery(["menus", `?restaurantId=${restaurantId}`], fetcher);

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
        refetch();
        reset();
        // navigate(`/menus/create?restaurantId=${restaurantId}`);
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
          <button
            type="submit"
            className="w-full flex justify-center px-4 py-2 font-medium bg-green-200 rounded-md mb-4"
          >
            {isLoading ? <Spinner /> : "Save Menu"}
          </button>
        </div>
      </form>
      {menuData &&
        menuData.results.map((menu: Menu) => (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="focus:outline-none flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>{menu.name}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                  Place for Menu Items
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
    </div>
  );
};

export default CreateMenu;
