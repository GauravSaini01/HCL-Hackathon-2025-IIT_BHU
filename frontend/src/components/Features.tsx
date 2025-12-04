import React from "react";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import Background from "./Background";

const Features: React.FC = () => {
  return (
    <Background>
    <section id="features" className="w-full py-20 px-6 md:px-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Why Choose CalmCare?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-xl transition">
          <div className="w-28 h-28 mx-auto mb-4">
            <img src={feature1} className="object-contain w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Smart Habit Tracking
          </h3>
          <p className="text-gray-600">
            Track sleep, water, steps, and more with ease.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-xl transition">
          <div className="w-28 h-28 mx-auto mb-4">
            <img src={feature2} className="object-contain w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Provider Monitoring
          </h3>
          <p className="text-gray-600">
            Doctors can easily check your activity and progress.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-xl transition">
          <div className="w-28 h-28 mx-auto mb-4">
            <img src={feature3} className="object-contain w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Personalized Insights
          </h3>
          <p className="text-gray-600">
            Weekly wellness insights tailored for you.
          </p>
        </div>
      </div>
    </section>
    </Background>
  );
};

export default Features;