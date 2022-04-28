import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { API_BASE_URL } from "../constants";

interface Props {
  children?: React.ReactNode;
}

const CreateRestaurant: React.FC<Props> = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutateAsync, isLoading, error, isError } = useMutation(
    (data: FieldValues) => {
      return fetch(`${API_BASE_URL}/restaurants`, {
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

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) =>
    await mutateAsync(data, {
      onSuccess: () => {
        navigate("/restaurants");
      },
    });

  return (
    <div className="h-full flex flex-col px-4 gap-2">
      <h2 className="text-xl font-semibold">Create Restaurant</h2>
      {isError && (
        <span className="text-center py-2 bg-red-400 text-white font-medium rounded-md">{`${error}`}</span>
      )}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-1 flex-col"
      >
        <div className="h-full flex flex-col flex-1 gap-3">
          <label className="flex flex-col text-base font-medium">
            Name
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Restaurant Name"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <label className="flex flex-col text-base font-medium">
            Owner Name
            <input
              {...register("ownerName", { required: true })}
              type="text"
              placeholder="Restaurant Owner Name"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <label className="flex flex-col text-base font-medium">
            Since
            <input
              {...register("since", { required: true })}
              type="number"
              placeholder="Established Year"
              className="mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </label>
          <label className="flex flex-col text-base font-medium">
            Location
            <input
              {...register("location", { required: true })}
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
          {isLoading ? <Spinner /> : "Add Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;