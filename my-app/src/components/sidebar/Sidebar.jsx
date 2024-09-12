import React from "react";
import logo from "../images/Norta 2024 _ Logo 1.png";
import man from "../images/Ellipse 8.png";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LuHelpCircle } from "react-icons/lu";
import { toast } from "react-toastify";

function Sidebar({ toggleClick, sidebarToggle }) {
  const navigate = useNavigate();
  const LogoutHndler = () => {
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logout successful !");
  };

  return (
    <>
      <input
        type="checkbox"
        id="check"
        checked={sidebarToggle}
        onChange={toggleClick}
      />
      <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label>
      <div className="sidebar font-[Poppins] flex flex-col justify-between fixed w-[300px]  h-screen left-[-300px] border bg-[white] shadow-sm ">
        <div className=" p-5 pl-5">
          <img className="w-24" src={logo} alt="" />

          <NavLink
            to="/dashboard"
            className="flex gap-3 items-center text-[#9197B3] mt-5  py-2 pl-2 rounded-lg  "
          >
            <MdDashboardCustomize className="text-xl" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/customers"
            className="flex gap-3 items-center text-[#9197B3] mt-5  py-2 pl-2 rounded-lg"
          >
            <FaRegUserCircle className="text-xl" />
            <span>Customers</span>
          </NavLink>

          <NavLink
            to="/transection"
            className="flex gap-2 items-center text-[#9197B3] mt-5  py-2 pl-2 rounded-lg"
          >
            <RiMoneyDollarCircleLine className="text-xl" />
            <span>Transections</span>
          </NavLink>

          <NavLink
            to="/help"
            className="flex gap-3 items-center text-[#9197B3] mt-5  py-2 pl-2 rounded-lg"
          >
            <LuHelpCircle className="text-xl" />
            <span>Help</span>
          </NavLink>
        </div>

        <div className="mb-10  mx-5">
          <div className="sidebar_small_con border rounded-2xl text-center p-2 pt-6 text-sm font-semibold">
            <p className="text-white px-6">
              Let’s make the Navtari event memorable
            </p>
            <button className="text-[#4925E9] bg-white my-4 rounded-3xl px-6 py-[0.50rem] ">
              Norta 2024 by SMJ
            </button>
          </div>

          <div className="text-left pt-5">
            <button
              onClick={LogoutHndler}
              className="bg-[#069ea1] px-5 py-2 rounded-lg text-white"
            >
              Logout <i className="fa-solid fa-right-from-bracket ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
