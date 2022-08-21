import React from "react";
import logo from "../assets/logo/loading.svg";
const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primary bg-opacity-5 absolute">
      <img src={logo} alt="React Logo" />
    </div>
  );
};

export default Loading;
