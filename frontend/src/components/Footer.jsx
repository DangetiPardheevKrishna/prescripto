import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-3">
        {/* Left Section */}

        <div className="flex flex-col items-start gap-2 mb-4">
          <img src={assets.logo} alt="Prescripto Logo" className="w-36" />

          <p className="text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            since the 1500s.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">GET IN TOUCH</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <FaPhone className="text-indigo-500" />
              <span>+1-212-456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-500" />
              <span>pardheevkrishna@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
