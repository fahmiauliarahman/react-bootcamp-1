import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          Fahmi's app
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink
              to="/albums"
              className={({ isActive }) =>
                isActive ? "bg-primary text-primary-content rounded-full" : ""
              }
            >
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
