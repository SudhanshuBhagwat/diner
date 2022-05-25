import React from "react";
import { Link } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Home: React.FC<Props> = () => {
  return (
    <div className="px-4">
      <h1 className="font-bold text-2xl">Home</h1>
      <Link className="text-blue-400 hover:underline" to={`/restaurants`}>Restaurants</Link>
    </div>
  );
};

export default Home;
