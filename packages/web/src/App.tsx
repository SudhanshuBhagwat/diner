import axios from "axios";
import { format } from "date-fns";
import { useQuery } from "react-query";
import Spinner from "./components/Spinner";

interface Restaurant {
  id: Number;
  name: string;
  createdAt: string;
}

function App() {
  const { data, error, isLoading } = useQuery<{
    results: Restaurant[];
  }>("getRestaurants", () =>
    axios.get("http://localhost:3001/restaurants").then((data) => data.data)
  );

  if (isLoading && !data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="flex flex-col space-y-2 max-w-md">
        {data?.results.map((result: any) => {
          return (
            <div className="flex w-64 justify-between items-center px-4 py-2 bg-gray-200 rounded-md">
              <h2>{result.name}</h2>
              <span>{format(new Date(result.createdAt), "Lo LLLL")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
