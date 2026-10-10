import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bus, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend server! Please ensure Spring Boot is running on port 8080.');
      } else if (err.response.status === 401 || err.response.status === 403) {
        setError('Invalid email or password. Please check your credentials.');
      } else {
        setError(err.response?.data?.message || 'Authentication error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@bms.com');
      setPassword('Admin@123');
    } else {
      setEmail('passenger@example.com');
      setPassword('User@123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F8F9FB]">
      <div className="max-w-md w-full bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-tr from-[#0B2545] to-[#1E4D7A] rounded-2xl flex items-center justify-center text-amber-400 mx-auto shadow-md shadow-navy-900/30 border border-amber-400/30 mb-3">
            <Bus className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B2545]">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in to your TravelSwift passenger or fleet account</p>
        </div>

        {/* Demo Fast-Login Pills */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
          <span className="text-[10px] font-bold text-[#0B2545] uppercase tracking-wider block">One-Click Demo Credentials:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemo('user')}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-navy-50 border border-slate-300 hover:border-navy-400 rounded-lg text-[#0B2545] font-bold text-[11px] transition-colors shadow-sm"
            >
              Passenger Login
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="flex-1 py-1.5 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-amber-800 font-bold text-[11px] transition-colors shadow-sm"
            >
              Admin Login
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B2545] uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0B2545] hover:bg-[#134074] disabled:opacity-50 text-amber-300 font-bold rounded-xl shadow-md text-xs transition-all flex items-center justify-center gap-2 border border-amber-400/30"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-amber-800 hover:text-amber-900 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
