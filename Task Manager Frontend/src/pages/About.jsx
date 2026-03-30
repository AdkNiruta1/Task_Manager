import React from 'react';
import { Code2, Database, LayoutTemplate, Server } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto animate-fade-in mt-4">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-3xl shadow-2xl min-h-[75vh]">
        <h1 className="text-4xl font-bold text-white mb-6">About TaskSphere</h1>
        <p className="text-slate-300 mb-8 leading-relaxed text-lg">
          TaskSphere is a premium, full-stack Task Manager designed to demonstrate the power of the MERN stack with modern layout principles. Stop tracking tasks on scattered notes and start managing them intelligently.
        </p>
        
        <h2 className="text-xl font-semibold text-indigo-400 mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/30 flex items-center gap-3">
            <LayoutTemplate className="text-cyan-400" />
            <div>
              <p className="font-medium text-white">React & Tailwind</p>
              <p className="text-xs text-slate-400">Frontend UI/UX</p>
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/30 flex items-center gap-3">
            <Server className="text-green-400" />
            <div>
              <p className="font-medium text-white">Node & Express</p>
              <p className="text-xs text-slate-400">Backend API</p>
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/30 flex items-center gap-3">
            <Database className="text-green-500" />
            <div>
              <p className="font-medium text-white">MongoDB Atlas</p>
              <p className="text-xs text-slate-400">Cloud Database</p>
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/30 flex items-center gap-3">
            <Code2 className="text-indigo-400" />
            <div>
              <p className="font-medium text-white">Mongoose</p>
              <p className="text-xs text-slate-400">Data Modeling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
