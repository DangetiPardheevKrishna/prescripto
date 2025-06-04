import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  console.log(backendUrl);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (state === "Admin") {
      const { data } = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });
      console.log(data);
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
        console.log(data.token);
        toast.success("Login Success", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        console.log("Erro");
        toast.error(data.error, {
          position: "top-center",
          autoClose: 3000,
        });
      }

      console.log(data);
    }

    // Add authentication logic here (API call, validation, etc.)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          {state === "Admin" ? "Admin " : "Doctor "}
          <span className="text-gray-800">Login</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                state === "Admin" ? "admin@example.com" : "doctor@example.com"
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:scale-102 cursor-pointer transition duration-300 mb-0"
          >
            Login
          </button>
          <p></p>
          {state === "Admin" ? (
            <p className="text-sm font-light text-gray-500">
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="hover:underline text-blue-500 cursor-pointer"
              >
                Click here!
              </span>
            </p>
          ) : (
            <p className="text-sm font-light text-gray-600">
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="hover:underline text-blue-500 cursor-pointer"
              >
                Click here!
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
