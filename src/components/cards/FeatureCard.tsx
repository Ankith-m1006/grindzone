
import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-grindzone-card rounded-lg p-6 card-glow flex flex-col items-center text-center transition-transform duration-300 hover:transform hover:scale-105">
      <div className="text-grindzone-blue mb-4 h-14 w-14 rounded-full flex items-center justify-center bg-grindzone-dark bg-opacity-50 shadow-glow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
