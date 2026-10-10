import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AnimatedBusTransitScene from '../components/AnimatedBusTransitScene';
import {
  Search,
  MapPin,
  Calendar,
  ArrowRightLeft,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Star,
  Users,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Bus,
  ThumbsUp,
  Map
} from 'lucide-react';

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

  const handleSelectCityDestination = (cityName) => {
    setDestination(cityName);
    // Smooth scroll up to search box
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const popularRoutes = [
    { from: 'Mumbai', to: 'Pune', time: '3h 10m', price: '₹450', operator: 'Shivneri Volvo' },
    { from: 'Pune', to: 'Mumbai', time: '3h 10m', price: '₹320', operator: 'Express Multi-Axle' },
    { from: 'Mumbai', to: 'Goa', time: '11h 00m', price: '₹1150', operator: 'Luxury Sleeper' },
    { from: 'Mumbai', to: 'Nashik', time: '3h 30m', price: '₹420', operator: 'AC Executive' },
  ];

  const popularCities = [
    {
      name: 'Mumbai',
      tagline: 'Financial Capital & Coastal Marine Drive',
      busesCount: '48+ Daily Buses',
      minFare: '₹350',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      boardingPoints: 'Dadar • Borivali • Sion • Andheri',
      highlight: 'Express Sea Link Corridor'
    },
    {
      name: 'Pune',
      tagline: 'Oxford of the East & IT Tech Corridor',
      busesCount: '65+ Daily Buses',
      minFare: '₹320',
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80',
      boardingPoints: 'Swargate • Wakad • Hinjewadi • Viman Nagar',
      highlight: 'High-Speed Expressway'
    },
    {
      name: 'Goa',
      tagline: 'Sun-Kissed Beaches & Sunset Coastline',
      busesCount: '24+ Daily Buses',
      minFare: '₹950',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      boardingPoints: 'Panaji • Mapusa • Margao • Calangute',
      highlight: 'Overnight Luxury AC Sleeper'
    },
    {
      name: 'Nashik',
      tagline: 'Scenic Vineyards & Sacred Godavari Ghats',
      busesCount: '32+ Daily Buses',
      minFare: '₹400',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      boardingPoints: 'CBS • Dwarka Circle • Mumbai Naka',
      highlight: 'Western Ghats Scenic Route'
    },
    {
      name: 'Mahabaleshwar',
      tagline: 'Misty Hill Station & Valley Viewpoints',
      busesCount: '18+ Daily Buses',
      minFare: '₹550',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      boardingPoints: 'Venna Lake • Market Stand • Panchgani',
      highlight: 'Ghats Panoramic Coach'
    },
    {
      name: 'Shirdi',
      tagline: 'Devotional Pilgrimage & Temple Corridor',
      busesCount: '30+ Daily Buses',
      minFare: '₹450',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
      boardingPoints: 'Temple Gate 2 • Shirdi Express Stand',
      highlight: 'Direct Superfast Shuttles'
    }
  ];

  const passengerReviews = [
    {
      name: 'Priya Deshmukh',
      role: 'Senior Tech Consultant, Pune',
      route: 'Pune (Wakad) ➔ Mumbai (Dadar)',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
      comment: 'As a weekly commuter between Hinjewadi and Mumbai, TravelSwift has been an absolute lifesaver. The real-time seat lock eliminates all double-booking surprises, and the Shivneri Volvo coaches are spotlessly clean!',
      badge: 'Weekly Verified Commuter'
    },
    {
      name: 'Aarav Mehta',
      role: 'University Student & Traveler, Mumbai',
      route: 'Mumbai ➔ Goa (Calangute)',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=80',
      comment: 'Booked an AC sleeper bus for our college weekend trip to Goa. The 2D seat selector made choosing our lower deck berths effortless, and the instant PDF boarding pass with QR code got us onboard in 10 seconds.',
      badge: 'Verified Passenger'
    },
    {
      name: 'Ananya Sen',
      role: 'Content Strategist & Solo Explorer',
      route: 'Mumbai ➔ Nashik Valley',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
      comment: 'As a solo female traveler, safe women-friendly seating and reliable GPS tracking are crucial for me. My night journey was so comfortable and peaceful. I recommend TravelSwift to all my friends!',
      badge: 'Solo Woman Traveler'
    },
    {
      name: 'Rajesh & Sunita Kulkarni',
      role: 'Family Commuters, Nashik',
      route: 'Nashik ➔ Mumbai Express',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
      comment: 'Traveled with my elderly parents to Mumbai. Punctual departure, smooth highway driving, comfortable ergonomic seats, and instant digital receipts. Outstanding full-stack transit platform!',
      badge: 'Family Traveler'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* ========================================================
          1. HERO SECTION WITH SEARCH ENGINE
         ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07182C] via-[#0B2545] to-[#133E68] text-white pt-14 pb-24">
        {/* Decorative Grid & Starlight */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-6 tracking-wide shadow-sm animate-float-slow">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>India's Premier Smart Bus Fleet & Instant Reservation Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-sm font-serif">
            Seamless Intercity Bus Journeys, Guaranteed Seats
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-serif">
            Reserve premium Volvo Multi-Axle, AC Sleeper, and Luxury Intercity coaches with real-time ACID seat lock, instant verified PNR, and zero booking conflicts.
          </p>

          {/* Search Box Card */}
          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-800 border-2 border-slate-200/90 text-left">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
                  From (Origin City)
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
                  To (Destination City)
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
                  Search Buses & Check Live Availability
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================
              2. ATTRACTIVE ANIMATED BUS TRANSIT SCENE
             ======================================================== */}
          <div className="mt-12">
            <div className="text-center mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                LIVE HIGHWAY SIMULATOR
              </span>
            </div>
            <AnimatedBusTransitScene />
          </div>
        </div>
      </section>

      {/* ========================================================
          3. TRENDING POPULAR CORRIDORS
         ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">Trending Express Corridors</h2>
              <p className="text-xs text-slate-500">Fastest transit routes with daily scheduled departures</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Guaranteed Departures
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
                  <Bus className="w-3.5 h-3.5 text-amber-600" />
                  <span>{r.operator}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SHOWCASE POPULAR CITIES & DESTINATIONS
         ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold mb-3">
            <Map className="w-3.5 h-3.5 text-amber-700" />
            <span>CONNECTING 150+ CITIES & TRANSIT HUBS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif">
            Explore Top Connected Cities & Hubs
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-serif">
            Direct Volvo, Sleeper, and Multi-Axle luxury bus departures connecting business capitals, heritage towns, and coastal retreats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCities.map((city, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all transform hover:-translate-y-1"
            >
              {/* City Photo Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* City Name Badge */}
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                      {city.highlight}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{city.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-300 block">Fares starting</span>
                    <span className="text-lg font-bold text-amber-300">{city.minFare}</span>
                  </div>
                </div>
              </div>

              {/* City Info Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 font-serif line-clamp-1">{city.tagline}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Bus className="w-3.5 h-3.5 text-[#0B2545]" />
                    <span className="font-semibold text-[#0B2545]">{city.busesCount}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span className="truncate">{city.boardingPoints}</span>
                  </div>
                </div>

                {/* Action button: Pre-fill destination */}
                <button
                  onClick={() => handleSelectCityDestination(city.name)}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#0B2545] text-[#0B2545] hover:text-amber-300 font-bold text-xs border border-slate-200 hover:border-[#0B2545] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Book Buses to {city.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. PASSENGERS & COMMUTERS COMMUNITY TESTIMONIALS
         ======================================================== */}
      <section className="bg-gradient-to-b from-white to-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold mb-3">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>VOICES OF 500,000+ COMMUTERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif">
              Trusted by Daily Commuters & Vacationers
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-serif">
              Real reviews from business professionals, students, families, and solo travelers enjoying seamless bus reservations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {passengerReviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                {/* Header: Passenger Avatar & Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-base text-[#0B2545]">{rev.name}</h4>
                      <p className="text-xs text-slate-500">{rev.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{rev.badge}</span>
                  </span>
                </div>

                {/* Rating & Route */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    {rev.route}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* Social Proof Counters Banner */}
          <div className="mt-14 bg-[#0B2545] text-white rounded-3xl p-8 shadow-xl border border-amber-400/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700/80">
              <div className="p-2">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 font-serif">500,000+</div>
                <p className="text-xs text-slate-300 mt-1 font-semibold">Happy Commuters</p>
              </div>
              <div className="p-2 pt-4 md:pt-2">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 font-serif">1,200+</div>
                <p className="text-xs text-slate-300 mt-1 font-semibold">Daily Bus Trips</p>
              </div>
              <div className="p-2 pt-4 md:pt-2">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 font-serif">99.2%</div>
                <p className="text-xs text-slate-300 mt-1 font-semibold">On-Time Departures</p>
              </div>
              <div className="p-2 pt-4 md:pt-2">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-serif">100%</div>
                <p className="text-xs text-slate-300 mt-1 font-semibold">Pessimistic Lock Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ARCHITECTURE & GUARANTEE HIGHLIGHTS
         ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] font-serif">
            Why Travelers Choose TravelSwift
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-serif">
            Engineered with modern full-stack Java architecture for high reliability, zero booking conflicts, and instant ticketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-[#0B2545] flex items-center justify-center mb-4 border border-navy-200">
              <ShieldCheck className="w-6 h-6 text-[#0B2545]" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2 font-serif">ACID Double-Booking Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Equipped with database transactions and pessimistic seat locking to mathematically ensure no two passengers are ever assigned the same seat.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-200">
              <Clock className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2 font-serif">Real-Time Seat Matrices</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Interactive 2D Lower and Upper deck visual layouts showing real-time booked, available, and premium window seats.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200">
              <Award className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-2 font-serif">Instant PNR & PDF E-Tickets</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Automatic alphanumeric PNR code assignment with one-click printable vouchers, boarding gate manifests, and automated refunds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
