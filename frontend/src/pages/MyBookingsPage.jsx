import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Ticket, Calendar, AlertCircle, CheckCircle, XCircle, ArrowRight, Ban } from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to fetch your bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, pnr) => {
    if (!window.confirm(`Are you sure you want to cancel booking ${pnr}? Cancellation charges may apply based on departure time.`)) {
      return;
    }

    try {
      const res = await api.put(`/bookings/${bookingId}/cancel`);
      setActionMsg(`Booking ${pnr} has been cancelled. Refund of ₹${res.data.refundAmount} has been processed.`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancellation failed.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-sky-600" /> My Bus Bookings
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage reservations, download tickets, or request cancellations</p>
        </div>

        <Link
          to="/"
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          Book New Trip
        </Link>
      </div>

      {actionMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          {actionMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {loading && (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-slate-500">Loading your journey history...</p>
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Bookings Found</h3>
          <p className="text-xs text-slate-500 mt-1">You haven't reserved any tickets yet.</p>
          <Link
            to="/"
            className="inline-block mt-4 px-5 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-sky-700 transition-all"
          >
            Find a Bus Now
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {bookings.map((b) => {
          const isCancelled = b.bookingStatus === 'CANCELLED';
          const seats = b.items.map((i) => i.seatNumber).join(', ');

          return (
            <div
              key={b.bookingId}
              className={`bg-white rounded-2xl border p-6 shadow-sm transition-all ${
                isCancelled ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                      {b.pnrNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isCancelled ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {b.sourceCity} ➔ {b.destinationCity}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {b.operatorName} • {b.busNumber} ({b.busType.replace('_', ' ')})
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="text-lg font-black text-slate-900">₹{b.totalAmount}</div>
                  <p className="text-[11px] text-slate-400">
                    Booked on: {new Date(b.bookingTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <div>
                    <span className="text-slate-400">Departure: </span>
                    <span className="font-semibold text-slate-800">
                      {new Date(b.departureTime).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Seats ({b.items.length}): </span>
                    <span className="font-bold text-sky-700">{seats}</span>
                  </div>
                  {isCancelled && b.refundAmount !== null && (
                    <div className="text-emerald-700 font-semibold text-[11px]">
                      Refund Amount: ₹{b.refundAmount}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    to={`/ticket-confirmation/${b.pnrNumber}`}
                    className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    View E-Ticket
                  </Link>
                  {!isCancelled && (
                    <button
                      onClick={() => handleCancelBooking(b.bookingId, b.pnrNumber)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
