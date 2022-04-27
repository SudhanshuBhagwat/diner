import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { API_BASE_URL } from "../constants";
import { fetcher } from "../shared/fetcher";

interface Props {
  children?: React.ReactNode;
}

const EdtRestaurant: React.FC<Props> = () => {
  const { restaurantId } = useParams();
  const {
    data,
    error: queryError,
    isLoading: queryIsLoading,
  } = useQuery(["restaurants", restaurantId], fetcher);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutateAsync, isLoading, error, isError } = useMutation(
    (data: FieldValues) => {
      return fetch(`${API_BASE_URL}/restaurants/${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          since: Number(data.since),
        }),
      }).catch((error: Error) => {
        throw new Error(error.message);
      });
    }
  );

  const {
    mutateAsync: deleteMutate,
    isLoading: deleteIsLoading,
    error: deleteError,
    isError: deleteIsError,
  } = useMutation((data: FieldValues) => {
    return fetch(`${API_BASE_URL}/restaurants/${restaurantId}`, {
      method: "DELETE",
    }).catch((error: Error) => {
      throw new Error(error.message);
    });
  });

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    return await mutateAsync(data, {
      onSuccess: () => {
        navigate("/restaurants");
      },
    });
  };

  const handleDelete = async () => {
    await deleteMutate(
      {},
      {
        onSuccess: () => {
          navigate("/restaurants");
        },
      }
    );
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
      <h2 className="text-xl font-semibold">Edit Restaurant</h2>
      {(isError || deleteIsError) && (
        <span className="text-center py-2 bg-red-400 text-white font-medium rounded-md">{`${
          error || deleteError
        }`}</span>
      )}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-1 flex-col"
      >
        <div className="h-full flex flex-col flex-1 gap-3">
          <label className="flex flex-col text-base font-medium">
            Name
            <input
              {...register("name", {
                required: true,
                value: data.results.name,
              })}
              type="text"
              placeholder="Restaurant Name"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <label className="flex flex-col text-base font-medium">
            Owner Name
            <input
              {...register("ownerName", {
                required: true,
                value: data.results.ownerName,
              })}
              type="text"
              placeholder="Restaurant Owner Name"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <label className="flex flex-col text-base font-medium">
            Since
            <input
              {...register("since", {
                required: true,
                value: data.results.since,
              })}
              type="number"
              placeholder="Established Year"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <label className="flex flex-col text-base font-medium">
            Location
            <input
              {...register("location", {
                required: true,
                value: data.results.location,
              })}
              type="text"
              placeholder="Current Location / Address"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center px-4 py-2 font-medium bg-green-200 rounded-md mb-4"
        >
          {isLoading ? <Spinner /> : "Edit Restaurant"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full flex justify-center px-4 py-2 font-medium bg-red-400 text-white rounded-md mb-4"
        >
          {deleteIsLoading ? (
            <Spinner className="text-white" />
          ) : (
            "Delete Restaurant"
          )}
        </button>
      </form>
    </div>
  );
};

export default EdtRestaurant;
