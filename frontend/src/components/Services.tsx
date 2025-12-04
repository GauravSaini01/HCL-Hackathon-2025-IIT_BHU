import React from "react";
import service1 from "../assets/services1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";

const Services: React.FC = () => {
  return (
    <section id="services" className="w-full py-20 px-6 md:px-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-8 bg-blue-50 shadow rounded-xl text-center hover:shadow-lg transition">
          <div className="w-28 h-28 mx-auto mb-4">
            <img src={service1} className="object-contain w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Daily Health Tracking
          </h3>
          <p className="text-gray-600">
            Monitor your vital habits daily with ease.
          </p>
        </div>

        <div className="p-8 bg-blue-50 shadow rounded-xl text-center hover:shadow-lg transition">
          <div className="w-28 h-28 mx-auto mb-4">
            <img src={service2} className="object-contain w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Preventive Care
          </h3>
          <p className="text-gray-600">
            Never miss important checkups and health routines.
          </p>
        </div>

        <div className="p-8 bg-blue-50 shadow rounded-xl text-center hover:shadow-lg transition">
          <div className="w-28 h-28 mx-auto mb-4">
            <img src={service3} className="object-contain w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Health Reports
          </h3>
          <p className="text-gray-600">
            Download and view weekly/monthly reports.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;