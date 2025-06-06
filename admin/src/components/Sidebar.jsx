import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div className="min-h-screen bg-white border-r border-gray-50">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${
                isActive ? `bg-[#f2f3ff] border-r-4 border-primary` : ``
              }`
            }
            to={"/dashboard"}
          >
            <img src={assets.home_icon} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${
                isActive ? `bg-[#f2f3ff] border-r-4 border-primary` : ``
              }`
            }
            to={"/add-appointments"}
          >
            <img src={assets.appointment_icon} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${
                isActive ? `bg-[#f2f3ff] border-r-4 border-primary` : ``
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} />

            <p>Add Doctors</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer md:min-w-72 ${
                isActive ? `bg-[#f2f3ff] border-r-4 border-primary` : ``
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
