import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { data, useLoaderData } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserData } =
    useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(false);
  const updateUserData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
      setEdit(false);
      console.log(data);
    } catch (error) {}
  };
  return (
    userData && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">
          <div className="flex items-center space-x-6 mb-6">
            {edit ? (
              <label htmlFor="image" className="bg-gray-500">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={image ? URL.createObjectURL(image) : userData.image}
                  />
                  <img
                    className="w-10 opacity-30 absolute"
                    src={image ? "" : assets.upload_icon}
                  />
                </div>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="bg-gray-500 w-24 h-24 rounded-lg object-cover"
              />
            )}
          </div>
          {edit ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border border-gray-300 rounded px-2 py-1 w-full max-w-60"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {userData.name}
            </h2>
          )}

          <hr className="mb-4" />

          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">
              CONTACT INFORMATION
            </h3>
            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Email id:</span>{" "}
                <a href={`mailto:${userData.email}`} className="text-blue-600">
                  {userData.email}
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {edit ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full max-w-60"
                  />
                ) : (
                  <a href={`tel:${userData.phone}`} className="text-blue-600">
                    {userData.phone}
                  </a>
                )}
              </p>
              <p>
                <span className="font-medium">Address:</span>
                <br />
                Line1 :
                {edit ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full max-w-60"
                  />
                ) : (
                  userData.address.line1
                )}
                <br />
                Line2:{" "}
                {edit ? (
                  <input
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    value={userData.address.line2}
                    className="border border-gray-300 rounded px-2 py-1 w-full max-w-60"
                  />
                ) : (
                  userData.address.line2
                )}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-600 font-semibold mb-2">
              BASIC INFORMATION
            </h3>
            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {edit ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full max-w-60"
                  />
                ) : (
                  userData.gender
                )}
              </p>
              <p>
                <span className="font-medium">Birthday:</span>{" "}
                {edit ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full max-w-60"
                  />
                ) : (
                  userData.dob
                )}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            {!edit && (
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="px-6 py-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
              >
                Edit
              </button>
            )}
            {edit && (
              <button
                onClick={updateUserData}
                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save info
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
