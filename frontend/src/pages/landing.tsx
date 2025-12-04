import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Background from "../components/Background";

const Landing: React.FC = () => {
  return (
    <Background>
    <div className="w-full min-h-screen bg-[conic-gradient(at_top_left,_#dfe9ff,_#ffffff,_#cfe7ff,_#e3f1ff)] text-gray-800">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Footer />
    </div>
    </Background>
  );
};

export default Landing;