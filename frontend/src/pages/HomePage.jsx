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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07182C] via-[#0B2545] to-[#133E68] text-white pt-16 pb-28">
        {/* Decorative Highway Grid / Starlight */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-6 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> India's Premier Bus Fleet & Reservation Network
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight drop-shadow-sm">
            Seamless Intercity Travel at Your Fingertips
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Book premium AC, Sleeper, and Luxury Volvo buses across major corridors with real-time seat lock and instant verified e-tickets.
          </p>

          {/* Search Box Card */}
          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-800 border-2 border-slate-200/90">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
                  From (Origin)
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-[#0B2545]" />
                  <input
                    type="text"
                    required
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-2 md:pt-4">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-800 border border-slate-300 flex items-center justify-center transition-transform hover:rotate-180"
                  title="Swap Origin and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
                  To (Destination)
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-amber-700" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Pune"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3 text-left">
                <label className="block text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
                  Date of Journey
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  />
                </div>
              </div>

              {/* Search Submit */}
              <div className="md:col-span-12 mt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#0B2545] via-[#133E68] to-[#B45309] hover:from-[#07182C] hover:to-[#92400E] text-amber-300 font-bold rounded-2xl shadow-lg shadow-navy-900/30 flex items-center justify-center gap-2 text-base transition-all transform hover:-translate-y-0.5 border border-amber-400/30"
                >
                  <Search className="w-5 h-5 text-amber-300" />
                  Search Buses & Check Fares
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">Trending Express Routes</h2>
              <p className="text-xs text-slate-500">Popular bus routes with daily guaranteed departures</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
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
                className="group p-4 rounded-2xl bg-slate-50/80 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-500">{r.time}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    from {r.price}
                  </span>
                </div>
                <div className="text-base font-bold text-[#0B2545] group-hover:text-amber-800 transition-colors">
                  {r.from} ➔ {r.to}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 group-hover:text-amber-700">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545]">
            Why Travelers Choose TravelSwift
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Engineered with modern full-stack Java architecture for high reliability, zero booking conflicts, and instant ticketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-[#0B2545] flex items-center justify-center mb-4 border border-navy-200">
              <ShieldCheck className="w-6 h-6 text-[#0B2545]" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2">ACID Double-Booking Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with database transactions and pessimistic seat locking to mathematically ensure no two passengers are ever assigned the same seat.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-200">
              <Clock className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2">Real-Time Seat Matrices</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive 2D Lower and Upper deck visual layouts showing real-time booked, available, and premium window seats.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200">
              <Award className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2">Instant PNR & PDF E-Tickets</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic alphanumeric PNR code assignment with one-click printable vouchers, boarding gate manifests, and automated refunds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
