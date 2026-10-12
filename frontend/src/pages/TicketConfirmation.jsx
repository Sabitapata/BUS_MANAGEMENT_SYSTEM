import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle, Printer, Bus, Calendar, MapPin, QrCode, ArrowRight, User } from 'lucide-react';

export default function TicketConfirmation() {
  const { pnr } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!booking && pnr) {
      fetchBooking();
    }
  }, [pnr]);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/bookings/pnr/${pnr}`);
      setBooking(res.data);
    } catch (err) {
      setError('Could not retrieve booking details.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-2xl border border-slate-200 text-center">
        <p className="text-sm text-rose-600 font-semibold mb-4">{error || 'Ticket not found'}</p>
        <Link to="/" className="px-4 py-2 bg-sky-600 text-white font-bold text-xs rounded-xl">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      {/* Success Badge */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-3 shadow-md shadow-emerald-500/10">
          <CheckCircle className="w-9 h-9" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Booking Confirmed!</h1>
        <p className="text-xs text-slate-500 mt-1">Your reservation has been recorded and seats are locked.</p>
      </div>

      {/* Printable E-Ticket Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden print:border-none print:shadow-none">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-[#07182C] via-[#0B2545] to-[#134074] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Official Boarding Pass</span>
            <div className="text-2xl font-bold mt-1 text-white">{booking.operatorName}</div>
            <p className="text-xs text-slate-300 font-mono">{booking.busNumber} • {booking.busType.replace('_', ' ')}</p>
          </div>

          <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-400/40 text-right shadow-inner">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">PNR Number</span>
            <div className="text-xl font-bold font-mono tracking-wider text-amber-300">{booking.pnrNumber}</div>
          </div>
        </div>

        {/* Route & Times */}
        <div className="p-6 sm:p-8 border-b border-dashed border-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Departure</span>
              <div className="text-2xl font-bold text-[#0B2545] mt-1">{booking.sourceCity}</div>
              <p className="text-xs font-bold text-amber-800">
                {new Date(booking.departureTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {new Date(booking.departureTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Bus className="w-6 h-6 text-[#0B2545] mb-1" />
              <div className="w-full h-0.5 bg-slate-300 relative">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-600 absolute -top-1 right-1/2 translate-x-1/2"></div>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 font-semibold">Direct Route</span>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</span>
              <div className="text-2xl font-bold text-[#0B2545] mt-1">{booking.destinationCity}</div>
              <p className="text-xs font-bold text-amber-800">
                {new Date(booking.arrivalTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {new Date(booking.arrivalTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Manifest */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-dashed border-slate-300">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Passenger & Seat Manifest
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Passenger Name</th>
                  <th className="pb-2">Age / Gender</th>
                  <th className="pb-2">Seat No.</th>
                  <th className="pb-2">Deck</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {booking.items.map((item, idx) => (
                  <tr key={item.itemId}>
                    <td className="py-2.5 text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 font-bold text-[#0B2545]">{item.passengerName}</td>
                    <td className="py-2.5 text-slate-600">{item.passengerAge} yrs / {item.passengerGender}</td>
                    <td className="py-2.5">
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded font-bold border border-amber-300">
                        {item.seatNumber}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-500">{item.deck}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Footer / Payment & QR representation */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left text-xs">
            <div className="text-slate-600">Payment Status: <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">PAID ({booking.paymentMethod})</span></div>
            <div className="text-slate-400 text-[11px] font-mono">TXN: {booking.transactionId}</div>
            <div className="text-xl font-bold text-[#0B2545]">Total Fare: ₹{booking.totalAmount}</div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white border border-slate-300 rounded-2xl shadow-sm">
            <QrCode className="w-12 h-12 text-[#0B2545]" />
            <div className="text-[10px] text-slate-500 text-left">
              <span className="font-bold text-[#0B2545] block">Scan at Bus Entry</span>
              Boarding Gate Pass
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 bg-[#0B2545] hover:bg-[#134074] text-amber-300 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all border border-amber-400/30"
        >
          <Printer className="w-4 h-4 text-amber-300" /> Print / Save PDF Ticket
        </button>
        <Link
          to="/my-bookings"
          className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
        >
          View All Bookings <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
