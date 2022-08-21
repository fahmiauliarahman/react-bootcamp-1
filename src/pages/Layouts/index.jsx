import React from "react";
import Navbar from "../../components/Navbar";

const Layouts = (props) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between p-6 pb-16">
        <div className="w-full flex-grow">{props.children}</div>
      </div>
    </>
  );
};

export default Layouts;
