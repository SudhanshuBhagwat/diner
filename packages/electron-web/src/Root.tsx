import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Root = () => {
  return (
    <main>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </main>
  );
};

export default Root;
