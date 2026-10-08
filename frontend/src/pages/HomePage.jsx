import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Search, MapPin, Calendar, ArrowRightLeft, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [source, setSource] = useState('Mumbai');
  const [destination, setDestination] = useState('Pune');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cities, setCities] = useState({ sourceCities: [], destinationCities: [] });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await api.get('/routes/cities');
      setCities(res.data);
    } catch (err) {
      console.error('Failed to load cities', err);
    }
  };

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination) return;
    navigate(`/trips?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${date}`);
  };

  const popularRoutes = [
    { from: 'Mumbai', to: 'Pune', time: '3h 10m', price: '₹450' },
    { from: 'Pune', to: 'Mumbai', time: '3h 10m', price: '₹320' },
    { from: 'Mumbai', to: 'Goa', time: '11h 00m', price: '₹1150' },
    { from: 'Mumbai', to: 'Nashik', time: '3h 30m', price: '₹420' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-900 text-white pt-16 pb-28">
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> India's Smartest Bus Reservation Network
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Seamless Intercity Travel at Your Fingertips
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Book premium AC, Sleeper, and Luxury Volvo buses across major corridors with real-time seat lock and instant e-tickets.
          </p>

          {/* Search Box Card */}
          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  From (Origin)
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-sky-600" />
                  <input
                    type="text"
                    required
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-2 md:pt-4">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 border border-slate-200 flex items-center justify-center transition-transform hover:rotate-180"
                  title="Swap Origin and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  To (Destination)
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-indigo-600" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Pune"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3 text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Date of Journey
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Search Submit */}
              <div className="md:col-span-12 mt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 text-base transition-all transform hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5" />
                  Search Buses
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Trending Express Routes</h2>
              <p className="text-xs text-slate-500">Popular bus routes with daily guaranteed departures</p>
            </div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              Live Fares
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularRoutes.map((r, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSource(r.from);
                  setDestination(r.to);
                  navigate(`/trips?source=${encodeURIComponent(r.from)}&destination=${encodeURIComponent(r.to)}&date=${date}`);
                }}
                className="group p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400">{r.time}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    from {r.price}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {r.from} ➔ {r.to}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  Click to check buses ➔
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Travelers Choose TravelSwift
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Engineered with modern full-stack Java architecture for high reliability and zero booking conflicts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">ACID Double-Booking Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with database transactions and pessimistic seat locking to mathematically ensure no two passengers are ever assigned the same seat.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Real-Time Seat Matrices</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive 2D Lower and Upper deck visual layouts showing real-time booked, available, and women-reserved seats.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Instant PNR & PDF E-Tickets</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic alphanumeric PNR code assignment with one-click printable vouchers, boarding gate manifests, and automated refunds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
