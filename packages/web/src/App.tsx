import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Restaurant {
  id: Number;
  name: string;
  createdAt: string;
}

function App() {
  const [data, setData] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/restaurants")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.results);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl">
        Hello From{" "}
        <span className="font-bold">
          <span className="text-cyan-400">@Diner's</span>{" "}
          <span className="text-yellow-200">React and TailwindCSS </span>
          Setup
        </span>
      </h1>
      <div className="flex flex-col space-y-2">
        {data.map((result) => {
          return (
            <div className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-md">
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
