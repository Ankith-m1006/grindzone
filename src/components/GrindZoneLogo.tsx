
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const GrindZoneLogo: React.FC<LogoProps> = ({ 
  size = "medium",
  showText = true
}) => {
  const sizeClasses = {
    small: "h-8",
    medium: "h-12",
    large: "h-20"
  };

  return (
    <div className="flex items-center">
      <div className={`relative ${showText ? "mr-4" : ""}`}>
        <div className={`bg-grindzone-blue rounded-md text-white font-bold flex items-center justify-center ${sizeClasses[size]}`} style={{
          width: size === "small" ? "32px" : size === "medium" ? "48px" : "80px",
          boxShadow: "0 0 15px rgba(30, 174, 219, 0.5)"
        }}>
          <span className={size === "small" ? "text-lg" : size === "medium" ? "text-2xl" : "text-4xl"}>GZ</span>
        </div>
      </div>
      
      {showText && (
        <span className={`font-bold ${size === "small" ? "text-lg" : size === "medium" ? "text-3xl" : "text-5xl"}`}>
          Grind<span className="text-grindzone-blue glow-text">Zone</span>
        </span>
      )}
    </div>
  );
};

export default GrindZoneLogo;
