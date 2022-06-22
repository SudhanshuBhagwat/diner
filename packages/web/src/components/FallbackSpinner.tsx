import React from "react";
import Spinner from "./Spinner";

interface Props {
  children?: React.ReactNode;
}

const FallbackSpinner: React.FC<Props> = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default FallbackSpinner;
