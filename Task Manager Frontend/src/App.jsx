import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        
        <div className="pb-16 w-full flex align-center justify-center">
          <Routes>
            {/* Public Entry */}
            <Route path="/" element={<Landing />} />
            
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Core Application */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Other Views */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
