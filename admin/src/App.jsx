import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import AddDoctor from "./pages/Admin/AddDoctor";
import AddAppointments from "./pages/Admin/AddAppointments";
import Dashboard from "./pages/Admin/Dashboard";
import DoctorsList from "./pages/Admin/DoctorsList";
const App = () => {
  const { aToken } = useContext(AdminContext);
  console.log(aToken);
  return (
    <>
      {aToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/add-appointments" element={<AddAppointments />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <>
          <ToastContainer />
          <Login />
        </>
      )}
    </>
  );
};

export default App;
