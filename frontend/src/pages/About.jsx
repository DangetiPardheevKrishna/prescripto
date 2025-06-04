import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          About Us
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Prescripto</span>, your
          trusted platform to connect with experienced and compassionate
          doctors. Our mission is to make healthcare accessible, efficient, and
          patient-focused by offering seamless online appointment booking and
          health services.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Our team is composed of certified medical professionals and tech
          enthusiasts who are passionate about improving healthcare experiences
          through innovation. Whether you're looking for a general physician or
          a specialist, we’ve got you covered with a wide network of
          professionals.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          We believe that quality healthcare is a right, not a privilege. Thank
          you for trusting us on your journey toward better health.
        </p>

        <div className="mt-8 text-center">
          <span className="text-gray-600 font-medium">Have questions?</span>
          <br />
          <span className="text-blue-600 font-semibold">
            Contact us at support@Prescripto.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
