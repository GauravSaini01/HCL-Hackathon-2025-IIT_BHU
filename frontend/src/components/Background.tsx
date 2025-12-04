import React from "react";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f2faff_25%,_#e1f2ff_55%,_#d7ecff_75%,_#cde6ff_100%)]">
      {children}
    </div>
  );
};

export default Background;