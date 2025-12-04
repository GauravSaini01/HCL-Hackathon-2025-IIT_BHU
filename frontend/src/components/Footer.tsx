import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-blue-600 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">CalmCare Wellness</h3>
        <p className="text-white/80 mt-2">Empowering health, one habit at a time.</p>

        <p className="text-white/60 mt-6 text-sm">
          ©️ 2025 CalmCare Wellness. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;