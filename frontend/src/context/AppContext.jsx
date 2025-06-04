import { createContext } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  console.log(userData);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const getDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const loadUserData = async () => {
    const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
      headers: { token },
    });
    if (data.success) {
      setUserData(data.user);
    } else {
      toast.error(data.message);
    }
    console.log(data.user);
  };
  useEffect(() => {
    if (token) loadUserData();
    else setUserData(false);
  }, [token]);
  useEffect(() => {
    getDoctors();
  }, []);

  const value = {
    doctors,
    getDoctors,
    backendUrl,
    token,
    setToken,
    loadUserData,
    userData,
    setUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
