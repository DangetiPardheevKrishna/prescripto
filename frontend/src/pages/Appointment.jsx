import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  console.log(slotIndex);
  const [slotTime, setSlotTime] = useState("");
  // console.log(docSlot[slotIndex][0].datetime.getMonth());
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const navigate = useNavigate();
  const { doctors, backendUrl, token, getDoctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const getRelatedDoctors = async () => {
    const getDoctor = doctors.find((doc) => doc._id === docId);
    const speciality = getDoctor.speciality;
    const relatedDoctorsInfo = doctors.filter(
      (eachDoc) =>
        eachDoc.speciality === speciality && eachDoc._id != getDoctor._id
    );
    setRelatedDoctors(relatedDoctorsInfo);
  };
  console.log(relatedDoctors);
  const fetchInfo = async () => {
    const info = await doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
    console.log(docInfo);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }

    const date = docSlot[slotIndex][0].datetime;
    console.log(slotIndex);
    console.log(date);
    const day = date.getDate();
    const month = date.toLocaleString("default", {
      month: "short",
    });
    const year = date.getFullYear();
    console.log(day);
    const slotDate = month + " " + day + " " + year;
    const { data } = await axios.post(
      backendUrl + "/api/user/book-appointment",
      {
        docId,
        slotTime,
        slotDate,
      },
      { headers: { token } }
    );
    if (data.success) {
      getDoctors();
      toast.success(data.message);
      navigate("/my-appointments");
    } else {
      toast.error(data.message);
    }
    console.log(data);
  };
  // const AvailableTimeSlots = () => {
  //   const today = new Date();

  //   for (let i = 0; i < 7; i++) {
  //     // Get the date i days from today
  //     let currentDate = new Date(today);
  //     currentDate.setDate(today.getDate() + i);

  //     // Set booking window end time to 9:00 PM
  //     let endTime = new Date();
  //     endTime.setDate(today.getDate() + i);
  //     endTime.setHours(16, 0, 0, 0); // 9:00 PM

  //     // Adjust today's time if we're on today's date
  //     if (today.getDate() === currentDate.getDate()) {
  //       let currentHour = currentDate.getHours();
  //       let currentMinute = currentDate.getMinutes();

  //       // Start from next available time slot
  //       currentDate.setHours(currentHour > 10 ? currentHour + 1 : 10);
  //       currentDate.setMinutes(currentMinute > 30 ? 30 : 0);
  //     } else {
  //       // For future days, start from 9:00 AM
  //       currentDate.setHours(9, 0, 0, 0);
  //     }

  //     const slots = [];

  //     // Generate time slots in 30-minute intervals until 9:00 PM
  //     while (currentDate < endTime) {
  //       let formattedTime = currentDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });
  //       const day = currentDate.getDate();
  //       const month = currentDate.toLocaleString("default", {
  //         month: "short",
  //       });
  //       const year = currentDate.getFullYear();
  //       const slotDate = month + " " + day + " " + year;
  //       const slotTime = formattedTime;

  //       // const isSlotAvailable =
  //       //   docInfo.slots_booked[slotDate] &&
  //       //   docInfo.slots_booked[slotDate].includes(slotTime)
  //       //     ? false
  //       //     : true;
  //       // const hour = currentDate.getHours().toString().padStart(2, "0");
  //       // const minute = currentDate.getMinutes().toString().padStart(2, "0");
  //       // if (isSlotAvailable) {

  //       // }
  //       slots.push({ datetime: new Date(currentDate), time: formattedTime });
  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }
  //     setDocSlot((prev) => [...prev, slots]);
  //     // allSlots.push({
  //     //   date: new Date(
  //     //     today.getFullYear(),
  //     //     today.getMonth(),
  //     //     today.getDate() + i
  //     //   ).toDateString(),
  //     //   slots: slots,
  //     // });
  //   }
  // };

  const AvailableTimeSlots = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      // Safely generate future date (i days from today)
      let currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      let endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i,
        16,
        0,
        0,
        0
      ); // 4 PM

      // Adjust slot start time
      if (i === 0) {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        currentDate.setHours(hour > 10 ? hour + 1 : 10);
        currentDate.setMinutes(minute > 30 ? 30 : 0);
      } else {
        currentDate.setHours(9, 0, 0, 0); // Future days start at 9 AM
      }

      const slots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.toLocaleString("default", { month: "short" });
        const year = currentDate.getFullYear();

        slots.push({
          datetime: new Date(currentDate), // Clone to prevent mutation
          time: formattedTime,
          displayDate: `${month} ${day} ${year}`,
          weekDay: currentDate
            .toLocaleString("default", { weekday: "short" })
            .toUpperCase(),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(slots);
    }

    // Set all at once to avoid duplicate renders or wrong state
    setDocSlot(allSlots);
  };

  console.log(slotTime);
  console.log(docSlot);
  console.log(doctors);

  useEffect(() => {
    fetchInfo();
  }, [doctors, docId]);

  useEffect(() => {
    AvailableTimeSlots();
  }, [doctors, docId]);

  useEffect(() => {
    getRelatedDoctors();
  }, [doctors, docId]);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    docInfo && (
      <>
        <div className="max-w-4xl mx-auto p-4 font-sans">
          <div className="flex items-start gap-6 bg-white shadow rounded-xl p-6">
            <div className="bg-primary rounded-lg w-full">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="h-60 object-cover rounded-lg"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                {docInfo.name}
                <span className="text-blue-500 text-sm bg-blue-100 px-2 py-1 rounded-full">
                  ✔
                </span>
              </h2>
              <p className="text-gray-600">
                {docInfo.degree} {docInfo.speciality}
                <span className="ml-2 text-sm bg-gray-200 px-2 py-0.5 rounded">
                  {docInfo.experience}
                </span>
              </p>
              <div className="mt-2 text-sm text-gray-700">
                <p>{docInfo.about}</p>
              </div>
              <p className="mt-3 text-gray-800 font-medium">
                Appointment fee:{" "}
                <span className="text-black font-semibold">$50</span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Booking slots
            </h3>
            <div className="flex gap-2 overflow-x-auto">
              {docSlot.length &&
                docSlot.map((eachSlot, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`cursor-pointer px-4 py-2 border rounded-lg text-center ${
                      slotIndex == index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <p>{eachSlot[0] && days[eachSlot[0].datetime.getDay()]}</p>
                    <p>{eachSlot[0] && eachSlot[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {docSlot.length &&
                docSlot[slotIndex].map((eachTime, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(eachTime.time)}
                    className={`px-4 py-2 border rounded-full text-sm ${
                      eachTime.time === slotTime
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    {eachTime.time.toLowerCase()}
                  </button>
                ))}
            </div>

            <div className="mt-6">
              <button
                onClick={bookAppointment}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Book an appointment
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-lg text-gray-600 font-medium text-center my-8">
          Find Related Doctors
        </h1>
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]  gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relatedDoctors.length &&
            relatedDoctors.map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                key={index}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img className="bg-blue-50" src={item.image} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 font-light">{item.speciality}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    )
  );
};

export default Appointment;
