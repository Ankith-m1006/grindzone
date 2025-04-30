
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GrindZoneLogo from "@/components/GrindZoneLogo";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-grindzone-dark">
      <div className="text-center mb-8">
        <GrindZoneLogo size="medium" />
      </div>
      
      <div className="bg-grindzone-card p-8 rounded-xl border border-border shadow-glow-blue max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-grindzone-blue glow-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! This page is out of bounds.</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        <Link to="/">
          <Button className="bg-grindzone-blue hover:bg-grindzone-blue-light">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
