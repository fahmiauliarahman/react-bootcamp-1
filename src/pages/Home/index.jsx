import React from "react";
import "./App.css";
import logo from "../../assets/logo/logo.svg";
import Layouts from "../Layouts";

const Home = () => {
  return (
    <Layouts>
      <div className="hero h-full-min-header">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={logo}
            className="App-logo max-w-sm rounded-lg"
            alt="React Logo"
          />
          <div className="text-center lg:text-justify">
            <h1 className="text-5xl font-bold">Welcome to belajar riyek!</h1>
            <p className="py-6">
              Maap source sama aplikasinya biasa aja, namanya juga masih belajar
              hehe~ 🗿
            </p>
            <a
              href="https://github.com/fahmiauliarahman/react-bootcamp-1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Go to Github
            </a>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Home;
