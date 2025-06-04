import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
const Navbar = () => {
  const navigate = useNavigate();
  // const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  console.log("token is", token);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-3 border-b border-b-gray-500">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-40 cursor-pointer"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-2"> HOME</li>
          <hr className="outline-none border-none w-3/5 bg-primary m-auto h-0.5 hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-2"> ALL DOCTORS</li>
          <hr className="outline-none border-none w-3/5 bg-primary m-auto h-0.5 hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-2"> ABOUT</li>
          <hr className="outline-none border-none w-3/5 bg-primary m-auto h-0.5 hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-2"> CONTACT</li>
          <hr className="outline-none border-none w-3/5 bg-primary m-auto h-0.5 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} />
            <img className="w-2.5" src={assets.dropdown_icon} />
            <div className="absolute top-0 right-0 pt-14 font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded-md flex flex-col gap-4 p-2">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white font-light rounded-lg cursor-pointer hidden md:flex items-center px-8 py-3 "
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
