import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutList, Shield, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="w-full min-h-[85vh] flex flex-col justify-center animate-fade-in relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col items-center text-center">
        <div className="bg-indigo-500/10 text-indigo-400 font-semibold px-4 py-2 rounded-full mb-8 border border-indigo-500/20">
          TaskSphere 2.0 is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Organize Your Life.<br/>
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Secure Your Tasks.
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mb-12">
          The ultimate premium MERN stack to-do manager. Create a private account, deploy tasks instantly, and never lose track of your productivity again.
        </p>
        
        <div className="flex gap-4 mb-20">
          <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-1">
            Get Started For Free
          </Link>
          <Link to="/about" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-2xl font-bold text-lg transition-all">
            Learn More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 p-8 rounded-3xl text-left">
            <LayoutList className="text-indigo-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Intuitive UI</h3>
            <p className="text-slate-400">Manage tasks instantly across a massive, full-screen glassmorphic dashboard interface.</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 p-8 rounded-3xl text-left">
            <Shield className="text-cyan-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Total Security</h3>
            <p className="text-slate-400">Industry-standard bcrypt hashing keeps your private lists completely invisible to others.</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 p-8 rounded-3xl text-left">
            <Zap className="text-yellow-400 w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-400">Powered by React, Node, and Atlas, your syncing speed operates in real-time unconditionally.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
