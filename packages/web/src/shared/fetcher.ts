import { API_BASE_URL } from "../constants";

export const fetcher = ({ queryKey }: { queryKey: any }) => {
  console.log({ queryKey });

  return fetch(`${API_BASE_URL}/${queryKey.join("/")}`).then((res) =>
    res.json()
  );
};
