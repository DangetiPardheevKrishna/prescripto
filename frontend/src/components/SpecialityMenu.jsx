import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center justify-start py-16"
    >
      <h1 className="text-3xl text-shadow-black font-medium mt-4">
        Find by Speciality{" "}
      </h1>
      <p className="text-sm text-center font-light max-w-1/3 my-3">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 overflow-scroll pt-5 w-full">
        {specialityData.map((eachSpeciality, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            to={`/doctors/${eachSpeciality.speciality}`}
            key={index}
          >
            <img className="w-16 sm:24 mb-2" src={eachSpeciality.image} />
            <p className="text-sm font-light">{eachSpeciality.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
