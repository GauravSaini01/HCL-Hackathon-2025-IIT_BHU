import React from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
      <div className="min-h-screen flex items-center justify-center px-6">
        
        <div className="bg-white/60 backdrop-blur-xl shadow-2xl p-10 rounded-3xl w-full max-w-md border border-white/40">
          
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Create Account
          </h2>

          <form className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Create a password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline ">
              Sign In
            </Link>
          </p>

        </div>
      </div>
  );
};

export default SignUp;