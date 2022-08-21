import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div className="w-full text-center lg:text-left">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && <i>{subtitle}</i>}
    </div>
  );
};

export default Title;
