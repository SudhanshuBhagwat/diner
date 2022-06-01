import { API_BASE_URL } from "../constants";

export const fetcher = ({ queryKey }: { queryKey: any }) => {
  return fetch(`${API_BASE_URL}/${queryKey.join("/")}`).then((res) =>
    res.json()
  );
};

export const postFetcher = ({
  queryKey,
  body,
}: {
  queryKey: any;
  body: any;
}) => {
  return fetch(`${API_BASE_URL}/${queryKey.join("/")}`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
