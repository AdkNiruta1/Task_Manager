import React, { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 mx-auto animate-fade-in mt-4">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-3xl shadow-2xl min-h-[75vh] flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Get in Touch</h1>
          <p className="text-slate-400 mb-8 text-center text-lg">Have a question or just want to say hi? Send me a message!</p>
          
          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center animate-fade-in">
              <CheckCircle size={48} className="text-green-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Message Sent!</h3>
              <p className="text-green-200">Thanks for reaching out. It has been safely stored in Atlas.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea 
                  required rows="4"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button 
                type="submit" disabled={status === 'submitting'}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50"
              >
                <Send size={18} /> {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">Failed to send message. Is your backend running?</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
