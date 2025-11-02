import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              EventFinder
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`relative px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive('/')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {isActive('/') && (
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg animate-pulse-glow"></span>
              )}
              <span className="relative flex items-center gap-2">
                <span className="text-lg">🔍</span>
                Browse Events
              </span>
            </Link>

            <Link
              to="/create"
              className={`relative group px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden ${
                isActive('/create')
                  ? 'text-white'
                  : 'text-white'
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-105"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></span>
              <span className="relative flex items-center gap-2 drop-shadow-lg">
                <span className="text-lg">✨</span>
                Create Event
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
    </nav>
  );
}
