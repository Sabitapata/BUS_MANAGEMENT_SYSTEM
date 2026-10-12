import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { ShieldCheck, User, CreditCard, QrCode, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const trip = location.state?.trip;
  const selectedSeats = location.state?.selectedSeats || [];

  const [passengers, setPassengers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!trip || selectedSeats.length === 0) {
      navigate('/');
      return;
    }

    // Initialize passenger list
    const initPassengers = selectedSeats.map((seat, idx) => ({
      seatId: seat.seatId,
      seatNumber: seat.seatNumber,
      deck: seat.deck,
      passengerName: idx === 0 && user ? user.fullName : '',
      passengerAge: 25,
      passengerGender: 'MALE',
    }));
    setPassengers(initPassengers);
  }, [trip, selectedSeats]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const calculateTotal = () => {
    const base = selectedSeats.length * Number(trip?.baseFare || 0);
    const gst = base * 0.05;
    return (base + gst).toFixed(2);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Payload verification
    for (const p of passengers) {
      if (!p.passengerName.trim()) {
        setError('Please enter passenger names for all selected seats.');
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        tripId: trip.tripId,
        passengers: passengers.map((p) => ({
          seatId: p.seatId,
          passengerName: p.passengerName,
          passengerAge: Number(p.passengerAge),
          passengerGender: p.passengerGender,
        })),
        paymentMethod,
      };

      const res = await api.post('/bookings', payload);
      // Redirect to confirmation with booking data
      navigate(`/ticket-confirmation/${res.data.pnrNumber}`, { state: { booking: res.data } });
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Conflict Detected: One or more selected seats were just reserved by another user. Please go back and select different seats.');
      } else {
        setError(err.response?.data?.message || 'Failed to complete booking. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!trip) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to bus results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Passenger Input & Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleConfirmBooking} className="space-y-6">
            {/* Passenger Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <User className="w-5 h-5 text-[#0B2545]" />
                <h3 className="font-bold text-lg text-[#0B2545]">Passenger Information</h3>
              </div>

              {passengers.map((p, idx) => (
                <div key={p.seatId} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0B2545]">Passenger {idx + 1}</span>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-lg font-bold border border-amber-300">
                      Seat {p.seatNumber} ({p.deck})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={p.passengerName}
                        onChange={(e) => handlePassengerChange(idx, 'passengerName', e.target.value)}
                        placeholder="e.g. Aditi Rao"
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2.5 text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        required
                        value={p.passengerAge}
                        onChange={(e) => handlePassengerChange(idx, 'passengerAge', e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2.5 text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Gender</label>
                      <select
                        value={p.passengerGender}
                        onChange={(e) => handlePassengerChange(idx, 'passengerGender', e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2.5 text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <CreditCard className="w-5 h-5 text-amber-700" />
                <h3 className="font-bold text-lg text-[#0B2545]">Payment Method Simulation</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'UPI', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'CARD', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'NETBANKING', label: 'Net Banking', icon: ShieldCheck },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-4 rounded-xl border text-left flex flex-col items-start gap-2 transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 text-amber-900 ring-2 ring-amber-400/30'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-700' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-[#0B2545]">Sandbox Simulator: </span>
                Real-time transaction authorization via mock payment gateway. Instant PNR issuance upon confirmation.
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#0B2545] via-[#134074] to-[#B45309] hover:from-[#07182C] hover:to-[#92400E] disabled:opacity-50 text-amber-300 font-bold rounded-2xl shadow-lg shadow-navy-900/30 flex items-center justify-center gap-2 text-base transition-all border border-amber-400/30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  Pay ₹{calculateTotal()} & Reserve Verified Ticket
                </>
              )}
            </button>
          </form>
        </div>

        {/* Fare & Journey Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 sticky top-24">
            <h4 className="font-bold text-base text-[#0B2545] pb-3 border-b border-slate-100">
              Trip Details
            </h4>

            <div>
              <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                {trip.operatorName}
              </span>
              <div className="text-lg font-bold text-[#0B2545] mt-2 flex items-center gap-1.5">
                <span>{trip.sourceCity}</span>
                <span className="text-amber-600 font-normal">➔</span>
                <span>{trip.destinationCity}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{trip.busNumber}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Departure:</span>
                <span className="font-bold text-[#0B2545]">
                  {new Date(trip.departureTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Seats ({selectedSeats.length}):</span>
                <span className="font-bold text-amber-800">
                  {selectedSeats.map((s) => s.seatNumber).join(', ')}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare:</span>
                <span className="font-semibold">₹{(selectedSeats.length * Number(trip.baseFare)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%):</span>
                <span className="font-semibold">₹{(selectedSeats.length * Number(trip.baseFare) * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-[#0B2545] pt-2 border-t border-slate-100">
                <span>Total Fare:</span>
                <span className="text-[#0B2545]">₹{calculateTotal()}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Full refund available up to 24 hours prior to scheduled departure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
