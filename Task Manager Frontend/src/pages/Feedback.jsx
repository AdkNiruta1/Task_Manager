import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Star, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Feedback() {
  const { user, loading } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle');

  if (loading) {
    return (
      <div className="w-full max-w-5xl px-4 mx-auto mt-4 flex justify-center py-24">
        <div className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-5xl px-4 mx-auto animate-fade-in mt-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-3xl shadow-2xl min-h-[75vh] flex flex-col justify-center items-center text-center">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="bg-indigo-500/10 p-4 rounded-3xl text-indigo-400 mb-6 border border-indigo-500/20">
              <Lock size={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Feedback Requires Sign In</h1>
            <p className="text-slate-400 mb-8 text-lg">
              To keep our feedback database clean and secure, only registered members of TaskSphere can submit feedback.
            </p>
            <div className="flex gap-4">
              <Link to="/login" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white rounded-xl font-bold transition-all hover:-translate-y-0.5">
                Sign In
              </Link>
              <Link to="/register" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-bold transition-all">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return; // Prevent empty ratings
    
    setStatus('submitting');
    try {
      await axios.post('http://localhost:5000/api/feedback', { rating, comment });
      setStatus('success');
      setRating(0);
      setComment('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 mx-auto animate-fade-in mt-4">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 md:p-12 rounded-3xl shadow-2xl min-h-[75vh] flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Leave Feedback</h1>
          <p className="text-slate-400 mb-8 text-center text-lg">How was your experience using TaskSphere today?</p>
          
          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center animate-fade-in">
              <CheckCircle size={48} className="text-green-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Feedback Recorded!</h3>
              <p className="text-green-200">Thank you! Your rating has been successfully saved to the database.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col items-center gap-2">
                <label className="text-sm font-medium text-slate-300">Tap to Rate (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={40} 
                        className={`${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg' : 'text-slate-600'} transition-all`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Additional Comments (Optional)</label>
                <textarea 
                  rows="3"
                  value={comment} onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  placeholder="Tell us what you loved or what we could improve..."
                />
              </div>
              
              <button 
                type="submit" disabled={status === 'submitting' || rating === 0}
                className="mt-2 w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">Failed to save feedback. Check your backend logs.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
