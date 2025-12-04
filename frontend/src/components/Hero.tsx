import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center text-center px-6 py-20">
      <span className="inline-block bg-blue-100 text-blue-600 py-1 px-4 rounded-full text-sm font-medium shadow-sm">
        🌿 Healthy everyday!
      </span>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight max-w-3xl mt-6">
        Your daily <span className="text-blue-600">wellness journey</span> starts here
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl mt-4">
        Track your health, follow preventive care, and build better habits — all in one calm, beautiful platform.
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Link
          to="/signup"
          className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 shadow"
        >
          Get Started
        </Link>

        <a
          href="#features"
          className="px-8 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 shadow-sm"
        >
          Learn more
        </a>
      </div>
    </header>
  );
};

export default Hero;