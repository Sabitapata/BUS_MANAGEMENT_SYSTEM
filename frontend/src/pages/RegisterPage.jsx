import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bus, Lock, Mail, User, Phone, AlertCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(fullName, email, password, phoneNumber);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F8F9FB]">
      <div className="max-w-md w-full bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-tr from-[#0B2545] to-[#1E4D7A] rounded-2xl flex items-center justify-center text-amber-400 mx-auto shadow-md shadow-navy-900/30 border border-amber-400/30 mb-3">
            <Bus className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B2545]">Create an Account</h2>
          <p className="text-xs text-slate-500 mt-1">Join TravelSwift to book tickets and manage bus journeys</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B2545] uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aditi Sharma"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B2545] uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditi@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B2545] uppercase mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B2545] uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0B2545] hover:bg-[#134074] disabled:opacity-50 text-amber-300 font-bold rounded-xl shadow-md text-xs transition-all flex items-center justify-center gap-2 border border-amber-400/30"
          >
            {loading ? 'Registering...' : 'Create Account'} <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-amber-800 hover:text-amber-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
