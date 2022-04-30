import React from "react";

interface Props {
  children?: React.ReactNode;
}

const Home: React.FC<Props> = () => {
  return (
    <div className="px-4">
      <h1 className="font-bold text-2xl">Home</h1>
    </div>
  );
};

export default Home;
