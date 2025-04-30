
import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-zinc-900 rounded-lg p-6 card-glow flex flex-col items-center text-center transition-transform duration-300 hover:transform hover:scale-105">
      <div className="text-purple-500 mb-4 h-14 w-14 rounded-full flex items-center justify-center bg-zinc-950 bg-opacity-50 shadow-glow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
