import { API_BASE_URL } from "../constants";

export const fetcher = ({ queryKey }: { queryKey: any }) => {
  return fetch(`${API_BASE_URL}/${queryKey.join("/")}`)
    .then((res) => res.json())
    .catch((error) => error);
};
