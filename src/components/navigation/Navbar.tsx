
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Trophy, User, Settings } from "lucide-react";
import GrindZoneLogo from "../GrindZoneLogo";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <GrindZoneLogo size="small" />
          </Link>
          
          <nav className="hidden md:flex space-x-2">
            <Link 
              to="/tournaments" 
              className={`nav-link ${isActive('/tournaments') ? 'nav-link-active' : ''}`}
            >
              <Trophy size={20} />
              Tournaments
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`nav-link ${isActive('/leaderboard') ? 'nav-link-active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Leaderboard
            </Link>
            
            <Link 
              to="/squad" 
              className={`nav-link ${isActive('/squad') ? 'nav-link-active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Squad
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/profile" 
            className={`nav-link ${isActive('/profile') ? 'nav-link-active' : ''}`}
          >
            <User size={20} />
            <span className="hidden md:inline">Profile</span>
          </Link>
          
          <Link 
            to="/settings" 
            className={`nav-link ${isActive('/settings') ? 'nav-link-active' : ''}`}
          >
            <Settings size={20} />
            <span className="hidden md:inline">Settings</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
