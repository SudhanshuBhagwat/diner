import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../components/CheckIcon";
import ImagePicker from "../../components/ImagePicker";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import { API_BASE_URL } from "../../constants";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  menuId: number;
}

const Item: React.FC<Props> = ({ isOpen, onClose, menuId }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [dataURL, setDataURL] = useState<string | undefined>();
  const [isVeg, setIsVeg] = useState<string>();

  const { mutateAsync, isLoading, error, isError } = useMutation(
    (data: FieldValues) => {
      return fetch(`${API_BASE_URL}/items?menuId=${menuId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          veg: isVeg === "veg" ? true : false,
          image: dataURL,
        }),
      }).catch((error: Error) => {
        throw new Error(error.message);
      });
    }
  );

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    await mutateAsync(data);
    onClose(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-4 py-2 border-b-2 border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-xl">Create Item</h3>
        <button className="text-red-600" onClick={() => onClose(false)}>
          Cancel
        </button>
      </div>
      <div className="px-4 py-2">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="h-full flex flex-col flex-1 gap-3">
            <div className="rounded-md h-48 overflow-hidden">
              <ImagePicker onChange={setDataURL} />
            </div>
            <label className="flex flex-col items-start text-base font-medium">
              Name
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Item Name"
                className="w-full mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              />
            </label>
            <label className="flex flex-col items-start text-base font-medium">
              Price
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Item Price"
                className="w-full mt-1 border-2 border-green-200 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
              />
            </label>
            <RadioGroup value={isVeg} onChange={setIsVeg}>
              <RadioGroup.Label className="flex items-start text-base font-medium">
                Plan
              </RadioGroup.Label>
              <div className="flex items-center space-x-6 py-2">
                <RadioGroup.Option value="veg">
                  {({ checked }) => (
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-6 h-6 border-2 border-gray-200 rounded-full ${
                          checked && "bg-blue-400"
                        }`}
                      >
                        <CheckIcon />
                      </span>
                      <span>Veg</span>
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="non-veg">
                  {({ checked }) => (
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-6 h-6 border-2 border-gray-200 rounded-full ${
                          checked && "bg-blue-400"
                        }`}
                      >
                        <CheckIcon />
                      </span>
                      <span>Non-Veg</span>
                    </div>
                  )}
                </RadioGroup.Option>
              </div>
            </RadioGroup>
            <button
              type="submit"
              className="w-full flex justify-center px-4 py-2 font-medium bg-green-200 rounded-md mb-4"
            >
              {isLoading ? <Spinner /> : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Item;
