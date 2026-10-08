import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bus, User, LogOut, ShieldCheck, Ticket, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                TravelSwift
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200">
                Bus Express
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors">
              Find Buses
            </Link>

            {user && (
              <Link to="/my-bookings" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors">
                <Ticket className="w-4 h-4 text-sky-500" />
                My Bookings
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Admin Panel
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 font-semibold text-xs">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-semibold text-slate-700 max-w-[120px] truncate">{user.fullName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl shadow-sm transition-all shadow-sky-600/20 hover:shadow-md"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Find Buses
          </Link>
          {user && (
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              My Bookings
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-amber-700"
            >
              Admin Dashboard
            </Link>
          )}
          <div className="pt-3 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">{user.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-rose-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2 text-sm font-medium border border-slate-300 rounded-lg text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2 text-sm font-medium bg-sky-600 text-white rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
