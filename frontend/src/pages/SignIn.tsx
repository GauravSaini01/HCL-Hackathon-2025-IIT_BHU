import React from "react";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
   
      <div className="min-h-screen flex items-center justify-center px-6">
        
        <div className="bg-white/60 backdrop-blur-xl shadow-2xl p-10 rounded-3xl w-full max-w-md border border-white/40">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Welcome Back
          </h2>

          <form className="space-y-6">

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
                placeholder="Enter your password"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow-md"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>

        </div>
      </div>
  );
};

export default SignIn;