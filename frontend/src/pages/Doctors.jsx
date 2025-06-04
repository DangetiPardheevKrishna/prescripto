import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const applyFilters = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((eachDoc) => eachDoc.speciality === speciality)
      );
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    applyFilters();
  }, [doctors, speciality]);

  console.log(filterDoc);
  return (
    <div className="my-6">
      <p>Browse through the doctors</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`border-2 border-primary rounded-xl pl-3 py-1.5 pr-10  font-medium text-gray-600 bg-primary-50 ${
              speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            } shadow-md w-auto cursor-pointer`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`border-2 border-primary rounded-xl pl-3 py-1.5 pr-10  font-medium text-gray-600 bg-primary-50 ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }  shadow-md w-auto cursor-pointer`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`border-2 border-primary rounded-xl pl-3 py-1.5 pr-10  font-medium text-gray-600 bg-primary-50 shadow-md ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }  w-auto cursor-pointer`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`border-2 border-primary rounded-xl pl-3 py-1.5 pr-10  font-medium text-gray-600 bg-primary-50 shadow-md w-auto ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }  cursor-pointer`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`border-2 border-primary rounded-xl pl-3 py-1.5 pr-10  font-medium text-gray-600 bg-primary-50 ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }  shadow-md w-auto cursor-pointer`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`border-2 border-primary rounded-xl pl-3 py-1.5 pr-10  font-medium text-gray-600 bg-primary-50 shadow-md ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }  w-auto cursor-pointer`}
          >
            Gastroenterologist
          </p>
        </div>

        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]  gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-500 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 font-light">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Doctors = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-800">
//         <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
//           ✦ Shadow Workout Login
//         </h1>
//         <p className="text-sm text-gray-400 text-center mb-6">
//           Train like Sung Jin-Woo. Rise, and level up!
//         </p>

//         <form className="space-y-5">
//           <div>
//             <label className="block text-sm text-gray-300">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-300">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={() => navigate("/home")}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transition"
//           >
//             Enter the Dungeon
//           </button>
//         </form>

//         <p className="text-sm text-gray-500 mt-6 text-center">
//           Not registered?{" "}
//           <span className="text-blue-400 hover:underline cursor-pointer">
//             Join the Guild
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Doctors;
