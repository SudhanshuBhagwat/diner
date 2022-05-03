import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { fetcher } from "../../shared/fetcher";
import { Menu } from "../Restaurant";

interface Props {
  children?: React.ReactNode;
}

const Menus: React.FC<Props> = () => {
  const [params] = useSearchParams();
  const restaurantId = params.get("restaurantId");
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useQuery(
    ["menus", `?restaurantId=${restaurantId}`],
    fetcher
  );

  return (
    <div className="h-full flex flex-col px-4 gap-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Menus</h1>
        <NavLink to={`create?restaurantId=${restaurantId}`}>
          <button className="px-4 py-2 font-medium bg-green-200 rounded-md">
            Add Menu
          </button>
        </NavLink>
      </div>
      {isError && (
        <span className="text-center py-2 bg-red-400 text-white font-medium rounded-md">{`${error}`}</span>
      )}
      {data &&
        data.results.map((menu: Menu) => (
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex items-center space-x-4">
                  <Disclosure.Button className="focus:outline-none flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-gray-900 focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                    <span>{menu.name}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-gray-500`}
                    />
                  </Disclosure.Button>
                  <button
                    onClick={() => navigate(`/menus/edit?menuId=${menu.id}`)}
                  >
                    Edit
                  </button>
                </div>
                <Disclosure.Panel className="px-2 text-sm text-gray-500 bg-gray-100">
                  Place for Menu Items
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
    </div>
  );
};

export default Menus;
