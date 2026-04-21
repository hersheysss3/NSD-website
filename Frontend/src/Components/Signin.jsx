import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import FadeInWrapper from "../Animation/FadeinWrapper.jsx"
import { useAuth } from '../Authentication/Authentication';
function Signin() {
  const {login}=useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { email, password } = formData;
      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      login(data.token);
      toast.success("User signed in successfully");
      navigate("/");
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <FadeInWrapper>
      <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
        {/* Enhanced Glowing elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Main glowing semicircle */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[400px] h-[200px] z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-0 w-full h-full 
            bg-[radial-gradient(ellipse_at_top,rgba(255,165,0,0.4),rgba(255,200,87,0.2),transparent_70%)]
            rounded-t-full
            shadow-[0_-40px_160px_rgba(255,165,0,0.3)]
            animate-glow-pulse">
            </div>
          </div>
        </div>

        {/* Form container */}
        <div className="relative z-10 glass-solid max-w-md w-full p-8 transition-all duration-500">
          {/* Header with orange accent */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">Every paw deserves a helping hand 🐾</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 pl-11 glass-input text-gray-800 placeholder-gray-400"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 pl-11 glass-input text-gray-800 placeholder-gray-400"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <a href="#" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300">
                Forgot your password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`glass-btn text-white font-semibold shadow-lg transition-all duration-300 transform ${
                isSubmitting ? 'opacity-70 cursor-not-allowed scale-100' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : 'Sign In'}
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300 hover:underline">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Custom styles */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes glow-pulse {
            0%, 100% {
              opacity: 0.6;
              filter: blur(15px);
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              filter: blur(20px);
              transform: scale(1.05);
            }
          }
          
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          
          .animate-glow-pulse {
            animation: glow-pulse 4s ease-in-out infinite;
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </FadeInWrapper>
  );
}

export default Signin;
