import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Mail, Star, UserCircle, LogIn } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  const linkStyles = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
    }`;

  return (
    <nav className="w-full max-w-6xl mx-auto px-4 mt-6 mb-10">
      <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-2 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
        <div className="flex font-bold text-2xl text-white ml-2">
          <span className="text-indigo-400">T</span>ask<span className="text-cyan-400">Sphere</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 flex-1">
          <NavLink to="/" className={linkStyles} end>
            <Home size={18} /> <span className="hidden sm:inline text-sm">Home</span>
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={linkStyles}>
              <UserCircle size={18} /> <span className="hidden sm:inline text-sm">Dashboard</span>
            </NavLink>
          )}
          <NavLink to="/about" className={linkStyles}>
            <Info size={18} /> <span className="hidden sm:inline text-sm">About</span>
          </NavLink>
          <NavLink to="/contact" className={linkStyles}>
            <Mail size={18} /> <span className="hidden sm:inline text-sm">Contact</span>
          </NavLink>
          <NavLink to="/feedback" className={linkStyles}>
            <Star size={18} /> <span className="hidden sm:inline text-sm">Feedback</span>
          </NavLink>
        </div>

        <div className="mr-2">
          {!user && (
            <NavLink to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-lg rounded-xl transition-all font-bold text-sm">
              <LogIn size={18} /> Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
