import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Armchair, Compass, AlertCircle } from 'lucide-react';

export default function SeatMatrix({ tripId, baseFare, selectedSeats, onToggleSeat }) {
  const [seatData, setSeatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDeck, setActiveDeck] = useState('LOWER');

  useEffect(() => {
    fetchSeats();
  }, [tripId]);

  const fetchSeats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/trips/${tripId}/seats`);
      setSeatData(res.data);
      if (res.data.upperDeckSeats && res.data.upperDeckSeats.length === 0) {
        setActiveDeck('LOWER');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load seat layout');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-[#0B2545] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-serif">Loading bus deck layout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        {error}
      </div>
    );
  }

  const hasUpperDeck = seatData?.upperDeckSeats && seatData.upperDeckSeats.length > 0;
  const currentDeckSeats = activeDeck === 'UPPER' ? seatData.upperDeckSeats : seatData.lowerDeckSeats;

  // Split seats into 2x2 rows
  const rows = [];
  for (let i = 0; i < currentDeckSeats.length; i += 4) {
    rows.push(currentDeckSeats.slice(i, i + 4));
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-[#0B2545]">Select Your Preferred Seats</h3>
          <p className="text-xs text-slate-500">Real-time seat matrix with instant reservation locking</p>
        </div>

        {/* Deck Switcher */}
        {hasUpperDeck && (
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveDeck('LOWER')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeDeck === 'LOWER' ? 'bg-[#0B2545] text-amber-300 shadow-sm' : 'text-slate-600 hover:text-[#0B2545]'
              }`}
            >
              Lower Deck
            </button>
            <button
              onClick={() => setActiveDeck('UPPER')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeDeck === 'UPPER' ? 'bg-[#0B2545] text-amber-300 shadow-sm' : 'text-slate-600 hover:text-[#0B2545]'
              }`}
            >
              Upper Deck
            </button>
          </div>
        )}
      </div>

      {/* Bus Cabin Visual Representation */}
      <div className="relative max-w-sm mx-auto bg-slate-50 border-2 border-slate-300 rounded-3xl p-6 shadow-inner">
        {/* Front of bus / Steering Indicator */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-dashed border-slate-300">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {activeDeck} DECK CABIN
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
            <span className="text-[10px] font-bold uppercase text-slate-400">Driver</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[#0B2545]">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* 2x2 Seating Grid */}
        <div className="space-y-3">
          {rows.map((row, rIdx) => {
            const leftPair = row.slice(0, 2);
            const rightPair = row.slice(2, 4);

            return (
              <div key={rIdx} className="flex justify-between items-center">
                {/* Left side 2 seats */}
                <div className="flex gap-2">
                  {leftPair.map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.seatId === seat.seatId);
                    const isBooked = seat.isBooked;

                    return (
                      <button
                        key={seat.seatId}
                        disabled={isBooked}
                        onClick={() => onToggleSeat(seat)}
                        title={isBooked ? `Seat ${seat.seatNumber} is already booked` : `Seat ${seat.seatNumber} - ₹${baseFare}`}
                        className={`w-11 h-11 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                          isBooked
                            ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#0B2545] text-amber-300 border-2 border-amber-500 shadow-md shadow-navy-900/30 scale-105'
                            : 'bg-white text-slate-800 border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        <Armchair className="w-4 h-4 mb-0.5" />
                        <span className="text-[10px]">{seat.seatNumber}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Aisle */}
                <div className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest px-2 select-none">
                  |
                </div>

                {/* Right side 2 seats */}
                <div className="flex gap-2">
                  {rightPair.map((seat) => {
                    const isSelected = selectedSeats.some((s) => s.seatId === seat.seatId);
                    const isBooked = seat.isBooked;

                    return (
                      <button
                        key={seat.seatId}
                        disabled={isBooked}
                        onClick={() => onToggleSeat(seat)}
                        title={isBooked ? `Seat ${seat.seatNumber} is already booked` : `Seat ${seat.seatNumber} - ₹${baseFare}`}
                        className={`w-11 h-11 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                          isBooked
                            ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#0B2545] text-amber-300 border-2 border-amber-500 shadow-md shadow-navy-900/30 scale-105'
                            : 'bg-white text-slate-800 border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        <Armchair className="w-4 h-4 mb-0.5" />
                        <span className="text-[10px]">{seat.seatNumber}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-emerald-500 bg-white"></div>
          <span className="font-semibold text-slate-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#0B2545] text-amber-300 border border-amber-500 flex items-center justify-center text-[10px] font-bold">✓</div>
          <span className="font-bold text-[#0B2545]">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300"></div>
          <span>Reserved</span>
        </div>
      </div>
    </div>
  );
}
