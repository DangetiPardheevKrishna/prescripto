import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctorForm = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  console.log(docImg);
  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        toast.error("Image Not selected");
        return;
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("degree", degree);
      formData.append("speciality", speciality);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      console.log(formData);
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setFees(100);
        setPassword("");
        setAbout("");
        setAddress1("");
        setAddress2("");
        setDegree("");
      } else {
        toast.error(data.message);
      }
      console.log(
        "Form Data:",
        name,
        email,
        password,
        docImg,
        experience,
        fees,
        speciality,
        degree,
        address1,
        address2,
        about
      );
    } catch (error) {
      toast.error(error.message);
    }
    // Submit logic here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-4  bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Doctor
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[80vh] overflow-y-scroll"
      >
        {/* Profile Picture Upload */}
        <div className="flex  justify-center mb-6 ">
          <div className="flex flex-col items-center">
            <label
              htmlFor="doc-img"
              className="w-32 h-32 p-0 bg-gray-50 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
            >
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              />
            </label>
            <span className="text-sm text-gray-500 mt-2">Upload photo</span>
            <input
              type="file"
              id="doc-img"
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
          </div>
        </div>

        {/* Grid Layout for Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Dr. John Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Doctor Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="doctor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="Doctor password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Speciality
            </label>
            <select
              name="experience"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Experience
            </label>
            <select
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            >
              <option value="">Select experience</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Years</option>
              <option value="3 Year">3 Years</option>
              <option value="4 Year">4 Years</option>{" "}
              <option value="5 Year">5 Years</option>{" "}
              <option value="6 Year">6 Years</option>{" "}
              <option value="7 Year">7 Years</option>{" "}
              <option value="8 Year">8 Years</option>{" "}
              <option value="9 Year">9 Years</option>{" "}
              <option value="10 Year">10 Years</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Consultation Fees
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
              <input
                type="number"
                name="fees"
                placeholder="500"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
                className="w-full pl-8 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Education
            </label>
            <input
              type="text"
              name="education"
              placeholder="MBBS, MD, etc."
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>
          <br />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Address Line 1
            </label>

            <input
              type="text"
              name="address1"
              placeholder="Clinic/Hospital name"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Address Line 2
            </label>

            <input
              type="text"
              name="address2"
              placeholder="Street, City, Pincode"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            />
          </div>

          <div className="space-y-1 col-span-2">
            <label className="text-sm font-medium text-gray-600">About</label>
            <textarea
              name="about"
              placeholder="Brief about your expertise, achievements, etc."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-primary hover:-translate-y-0.5 transition duration-200 cursor-pointer text-white font-medium py-2 px-4 rounded-md shadow-sm"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
