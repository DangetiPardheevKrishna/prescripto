import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, token, getDoctors } = useContext(AppContext);
  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId: id },
        { headers: { token } }
      );
      if (data.success) {
        getAppointments();
        getDoctors();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAppointments = async () => {
    const { data } = await axios.get(backendUrl + "/api/user/appointments", {
      headers: { token },
    });
    if (data.success) {
      setAppointments(data.appointments.reverse());
      toast.error(data.message);
    } else {
      toast.error(data.message);
    }
    console.log(appointments);
  };
  useEffect(() => {
    getAppointments();
  }, [token]);
  return (
    appointments &&
    appointments.map((item, index) => (
      <div
        key={index}
        className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg flex justify-between items-center"
      >
        <div className="flex items-center">
          {/* <img
            src={item.docData.image} // Replace with real image
            alt={item.docData.name}
            className="w-34 h-34 object-cover rounded-md mr-6"
          /> */}
          <div className="h-40 w-40 bg-blue-50 border border-blue-200 rounded-lg mr-3">
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {item.docData.name}
            </h2>
            <p className="text-gray-600">{item.docData.speciality}</p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Address:</span>
              <br />
              {item.docData.address.line1} <br />
              {item.docData.address.line2}{" "}
            </p>
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Date &amp; Time:</span>{" "}
              {item.slotDate} | {item.slotTime}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {!item.cancelled && (
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700  hover:bg-blue-500 hover:text-white transition">
              Pay Online
            </button>
          )}
          {!item.cancelled && (
            <button
              onClick={() => cancelAppointment(item._id)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-red-500 hover:text-white transition"
            >
              Cancel appointment
            </button>
          )}
          {item.cancelled && (
            <button
              onClick={() => cancelAppointment(item._id)}
              className="px-4 py-2 border border-gray-300 rounded-md  bg-red-500 hover:bg-red-600 text-white transition"
            >
              Appointment Cancelled
            </button>
          )}
        </div>
      </div>
    ))
  );
};

export default MyAppointments;
