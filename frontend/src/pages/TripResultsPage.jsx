import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import SeatMatrix from '../components/SeatMatrix';
import { Bus, Clock, MapPin, Filter, ArrowRight, Shield, AlertCircle, Sparkles } from 'lucide-react';

export default function TripResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const source = searchParams.get('source') || 'Mumbai';
  const destination = searchParams.get('destination') || 'Pune';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected Trip & Seats
  const [expandedTripId, setExpandedTripId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); // [{ seatId, seatNumber, deck }]

  // Filters
  const [filterType, setFilterType] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEPARTURE');

  useEffect(() => {
    fetchTrips();
  }, [source, destination, date]);

  const fetchTrips = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/trips/search?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${date}`);
      setTrips(res.data);
    } catch (err) {
      setError('Unable to load trips. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSeat = (seat) => {
    const exists = selectedSeats.some((s) => s.seatId === seat.seatId);
    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => s.seatId !== seat.seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can select a maximum of 6 seats per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, { seatId: seat.seatId, seatNumber: seat.seatNumber, deck: seat.deck }]);
    }
  };

  const handleTripExpand = (tripId) => {
    if (expandedTripId === tripId) {
      setExpandedTripId(null);
      setSelectedSeats([]);
    } else {
      setExpandedTripId(tripId);
      setSelectedSeats([]);
    }
  };

  const handleProceedToCheckout = (trip) => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to proceed.');
      return;
    }
    // Navigate to checkout with state
    navigate('/checkout', {
      state: {
        trip,
        selectedSeats,
      },
    });
  };

  // Filter & Sort
  const filteredTrips = trips.filter((t) => {
    if (filterType === 'ALL') return true;
    return t.busType.includes(filterType);
  }).sort((a, b) => {
    if (sortBy === 'PRICE_LOW') return Number(a.baseFare) - Number(b.baseFare);
    if (sortBy === 'PRICE_HIGH') return Number(b.baseFare) - Number(a.baseFare);
    return new Date(a.departureTime) - new Date(b.departureTime);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Route Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full w-fit mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Showing Available Schedules
          </div>
          <h1 className="text-3xl font-bold text-[#0B2545] flex items-center gap-3">
            <span>{source}</span>
            <span className="text-amber-600 font-normal">➔</span>
            <span>{destination}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Travel Date: <span className="font-bold text-[#0B2545]">{new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </p>
        </div>

        {/* Change Search Button */}
        <button
          onClick={() => navigate('/')}
          className="text-xs font-bold text-[#0B2545] hover:text-amber-800 border border-slate-300 hover:border-amber-400 hover:bg-amber-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          Modify Search
        </button>
      </div>

      {/* Main Layout: Filters Sidebar + Bus Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 font-bold text-base text-[#0B2545] pb-3 border-b border-slate-100">
              <Filter className="w-4 h-4 text-amber-600" />
              Filter & Sort
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              >
                <option value="DEPARTURE">Departure Time (Earliest)</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
              </select>
            </div>

            {/* Bus Type Filters */}
            <div>
              <label className="block text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2">Bus Type</label>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'All Buses', val: 'ALL' },
                  { label: 'AC Sleeper', val: 'SLEEPER' },
                  { label: 'Volvo / Luxury', val: 'VOLVO' },
                  { label: 'Standard Seater', val: 'SEATER' },
                ].map((item) => (
                  <label key={item.val} className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-[#0B2545] font-semibold">
                    <input
                      type="radio"
                      name="busType"
                      checked={filterType === item.val}
                      onChange={() => setFilterType(item.val)}
                      className="accent-[#0B2545]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Safety Guarantee */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-start gap-2">
              <Shield className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>All bus trips protected with live pessimistic seat-locking.</span>
            </div>
          </div>
        </div>

        {/* Bus List */}
        <div className="lg:col-span-3 space-y-4">
          {loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-8 h-8 border-4 border-[#0B2545] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm font-bold text-[#0B2545]">Searching express buses...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          {!loading && !error && filteredTrips.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <Bus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No buses found for this date</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for today or the upcoming 7 days, or modify the route between Mumbai, Pune, Goa, or Nashik.
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 px-4 py-2 bg-[#0B2545] text-amber-300 font-bold text-xs rounded-xl shadow-sm hover:bg-[#134074]"
              >
                Search Another Date
              </button>
            </div>
          )}

          {!loading &&
            filteredTrips.map((trip) => {
              const isExpanded = expandedTripId === trip.tripId;
              const depTime = new Date(trip.departureTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
              const arrTime = new Date(trip.arrivalTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
              const durationHours = Math.floor(trip.durationMinutes / 60);
              const durationMins = trip.durationMinutes % 60;

              return (
                <div key={trip.tripId} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-all">
                  {/* Card Header / Details */}
                  <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Operator & Type */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-300">
                        {trip.busType.replace('_', ' ')}
                      </span>
                      <h3 className="text-xl font-bold text-[#0B2545]">{trip.operatorName}</h3>
                      <p className="text-xs text-slate-500 font-mono">{trip.busNumber} • {trip.amenities || 'Standard Amenities'}</p>
                    </div>

                    {/* Timings & Duration */}
                    <div className="flex items-center gap-6 text-center">
                      <div>
                        <span className="text-xl font-bold text-[#0B2545]">{depTime}</span>
                        <p className="text-[11px] font-semibold text-slate-500">{trip.sourceCity}</p>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-500">
                          {durationHours}h {durationMins}m
                        </span>
                        <div className="w-20 sm:w-24 h-0.5 bg-slate-300 relative my-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#0B2545] absolute -top-[4px] right-0"></div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono">{trip.distanceKm} km</span>
                      </div>

                      <div>
                        <span className="text-xl font-bold text-[#0B2545]">{arrTime}</span>
                        <p className="text-[11px] font-semibold text-slate-500">{trip.destinationCity}</p>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col items-end gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-right">
                        <span className="text-xs text-slate-400">Starts from</span>
                        <div className="text-2xl font-bold text-[#0B2545]">₹{trip.baseFare}</div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {trip.availableSeatsCount} seats left
                        </span>
                      </div>

                      <button
                        onClick={() => handleTripExpand(trip.tripId)}
                        className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                          isExpanded
                            ? 'bg-slate-800 text-white hover:bg-slate-900 border-slate-800'
                            : 'bg-[#0B2545] text-amber-300 hover:bg-[#134074] border-amber-400/30 shadow-sm shadow-navy-900/20'
                        }`}
                      >
                        {isExpanded ? 'Hide Seats' : 'View Seats'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Seat Selection Section */}
                  {isExpanded && (
                    <div className="p-6 bg-slate-50 border-t border-slate-200 animate-fadeIn">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {/* Seat Matrix 2D Layout */}
                        <div className="lg:col-span-2">
                          <SeatMatrix
                            tripId={trip.tripId}
                            baseFare={trip.baseFare}
                            selectedSeats={selectedSeats}
                            onToggleSeat={handleToggleSeat}
                          />
                        </div>

                        {/* Booking Summary Box */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                          <h4 className="font-bold text-base text-[#0B2545] pb-2 border-b border-slate-100">
                            Seat Reservation Summary
                          </h4>

                          <div>
                            <span className="text-xs font-semibold text-slate-600">Selected Seats ({selectedSeats.length}):</span>
                            <div className="flex flex-wrap gap-1.5 mt-1.5 min-h-[32px]">
                              {selectedSeats.length === 0 ? (
                                <span className="text-xs italic text-slate-400">No seats selected yet</span>
                              ) : (
                                selectedSeats.map((s) => (
                                  <span
                                    key={s.seatId}
                                    className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-lg border border-amber-300"
                                  >
                                    Seat {s.seatNumber} ({s.deck})
                                  </span>
                                ))
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                            <div className="flex justify-between text-slate-600">
                              <span>Base Fare ({selectedSeats.length} × ₹{trip.baseFare})</span>
                              <span className="font-semibold">₹{(selectedSeats.length * Number(trip.baseFare)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span>GST (5%)</span>
                              <span className="font-semibold">₹{(selectedSeats.length * Number(trip.baseFare) * 0.05).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base text-[#0B2545] pt-2 border-t border-slate-100">
                              <span>Total Amount</span>
                              <span className="text-[#0B2545]">
                                ₹{(selectedSeats.length * Number(trip.baseFare) * 1.05).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <button
                            disabled={selectedSeats.length === 0}
                            onClick={() => handleProceedToCheckout(trip)}
                            className="w-full py-3 bg-gradient-to-r from-[#0B2545] via-[#134074] to-[#B45309] hover:from-[#07182C] hover:to-[#92400E] disabled:opacity-50 disabled:cursor-not-allowed text-amber-300 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-xs transition-all border border-amber-400/30"
                          >
                            Proceed to Book <ArrowRight className="w-4 h-4 text-amber-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
