import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <aside className="flex flex-col border-r border-gray-200 min-h-full w-64 pt-6">
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary" 
          }`
        }
      >
        <img src={assets.home_icon} alt="Dashboard" className="w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary" 
          }`
        }
      >
        <img src={assets.add_icon} alt="Add Blog" className="w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary" 
          }`
        }
      >
        <img src={assets.list_icon} alt="List Blog" className="w-5" />
        <p className="hidden md:inline-block">List Blog</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary" 
          }`
        }
      >
        <img src={assets.comment_icon} alt="Comments" className="w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
