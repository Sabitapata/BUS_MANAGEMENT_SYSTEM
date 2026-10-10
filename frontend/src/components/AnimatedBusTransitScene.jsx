import React, { useState } from 'react';
import { Bus, Compass, Radio, Volume2, Sparkles, Sun, Moon } from 'lucide-react';

export default function AnimatedBusTransitScene() {
  const [isNight, setIsNight] = useState(true);
  const [honking, setHonking] = useState(false);

  const handleHonk = () => {
    setHonking(true);
    setTimeout(() => setHonking(false), 1200);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/80 select-none">
      {/* Top Controller Bar */}
      <div className="bg-[#07182C] px-4 py-2.5 flex flex-wrap justify-between items-center text-xs border-b border-slate-700/60 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-amber-300 font-bold tracking-wider text-[11px]">
            GPS LIVE TRACKING: SHIVNERI VOLVO EXPRESS #MH-02-EX-4040
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleHonk}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 font-bold transition-all transform active:scale-95"
            title="Press Bus Horn"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Honk Horn</span>
          </button>

          <button
            onClick={() => setIsNight(!isNight)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all font-semibold"
            title="Toggle Day / Night Highway Scene"
          >
            {isNight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px]">Night Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Sunset Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Animated Highway Stage */}
      <div
        className={`relative h-64 sm:h-72 overflow-hidden transition-colors duration-700 ${
          isNight
            ? 'bg-gradient-to-b from-[#030B17] via-[#071A33] to-[#0A2545]'
            : 'bg-gradient-to-b from-[#2B1055] via-[#7597DE] to-[#D97706]'
        }`}
      >
        {/* Distant Mountains & City Skyline Silhouette */}
        <div className="absolute inset-x-0 bottom-24 h-32 opacity-25 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#051326]">
            {/* Hills */}
            <path d="M0 80 Q 150 20 300 80 T 600 60 T 900 70 T 1200 50 L 1200 120 L 0 120 Z" />
            {/* City Silhouette Buildings */}
            <rect x="180" y="45" width="25" height="75" />
            <rect x="210" y="30" width="35" height="90" />
            <rect x="250" y="55" width="20" height="65" />
            <rect x="520" y="40" width="30" height="80" />
            <rect x="555" y="25" width="40" height="95" />
            <rect x="600" y="50" width="25" height="70" />
            <rect x="850" y="35" width="35" height="85" />
            <rect x="890" y="20" width="45" height="100" />
          </svg>
        </div>

        {/* Twinkling Stars in Night Mode */}
        {isNight && (
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <span className="absolute top-4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></span>
            <span className="absolute top-10 left-2/3 w-1.5 h-1.5 bg-amber-200 rounded-full animate-pulse"></span>
            <span className="absolute top-6 left-1/2 w-1 h-1 bg-white rounded-full"></span>
            <span className="absolute top-12 left-1/6 w-1 h-1 bg-amber-100 rounded-full animate-ping"></span>
            <span className="absolute top-16 left-5/6 w-1 h-1 bg-white rounded-full animate-pulse"></span>
          </div>
        )}

        {/* Floating Telemetry Widget */}
        <div className="absolute top-3 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>SPEED: <strong className="text-amber-300">84 KM/H</strong></span>
          <span className="text-slate-500">•</span>
          <span>CORRIDOR: <strong className="text-amber-300">MUMBAI-PUNE EXPWY</strong></span>
        </div>

        {/* Honk Speech Balloon */}
        {honking && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 bg-amber-400 text-slate-950 font-black text-sm rounded-full shadow-xl border-2 border-slate-900 animate-bounce">
            🔊 BEEP BEEP! PEEP! 🚍
          </div>
        )}

        {/* Animated Highway Road Floor */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[#18212F] border-t-4 border-slate-600">
          {/* Road Asphalt Texture */}
          <div className="absolute inset-0 bg-[#121924]"></div>

          {/* Red/White Road Curb */}
          <div className="absolute top-0 inset-x-0 h-1.5 animate-road-curb"></div>

          {/* Center Streaming Dashed Lanes */}
          <div className="absolute top-12 inset-x-0 h-1 animate-road-lanes"></div>

          {/* Bottom Road Curb */}
          <div className="absolute bottom-1 inset-x-0 h-1 opacity-50 animate-road-lanes"></div>
        </div>

        {/* Headlight Golden Road Projection Beam */}
        <div className="absolute bottom-5 left-1/2 -translate-x-4 w-[280px] sm:w-[360px] h-24 bg-gradient-to-r from-amber-300/40 via-amber-200/20 to-transparent blur-md clip-headlight animate-headlight-beam pointer-events-none z-10 transform origin-left rotate-2"></div>

        {/* THE LUXURY VOLVO COACH (Animated Driving Bus) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:-translate-x-40 z-20 animate-bus-chassis">
          {/* Main Bus SVG Illustration */}
          <svg
            className="w-80 sm:w-96 h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
            viewBox="0 0 380 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bus Shadow on Road */}
            <ellipse cx="190" cy="132" rx="170" ry="8" fill="#000000" opacity="0.6" />

            {/* Rear Exhaust Smoke */}
            <circle cx="16" cy="115" r="5" fill="#94A3B8" className="animate-exhaust-1" />
            <circle cx="12" cy="118" r="6" fill="#CBD5E1" className="animate-exhaust-2" />

            {/* Main Coach Body (Deep Midnight Transit Navy) */}
            <path
              d="M30 35 C 30 20, 45 15, 70 15 L 335 15 C 355 15, 370 25, 375 55 L 378 100 C 378 112, 368 116, 355 116 L 35 116 C 25 116, 20 110, 20 98 L 22 45 C 22 38, 25 35, 30 35 Z"
              fill="#0B2545"
              stroke="#1E4D7A"
              strokeWidth="2"
            />

            {/* Aerodynamic Front Roof Curved Spoiler */}
            <path
              d="M320 15 L 360 22 C 372 26, 376 38, 376 52 L 340 50 Z"
              fill="#133E68"
            />

            {/* Golden Dynamic Highway Swoosh Livery */}
            <path
              d="M35 88 Q 180 88, 260 70 T 375 75 L 376 92 Q 280 86, 200 102 L 35 102 Z"
              fill="url(#goldLiveryGradient)"
            />

            {/* Digital Destination Board (LED Amber Glow) */}
            <rect x="290" y="24" width="70" height="12" rx="3" fill="#030712" stroke="#B45309" strokeWidth="1" />
            <text x="295" y="33" fill="#FBBF24" fontSize="7" fontFamily="monospace" fontWeight="bold">
              MUMBAI-PUNE
            </text>

            {/* Front Large Windshield */}
            <path
              d="M330 38 L 372 44 C 374 54, 373 66, 370 70 L 328 70 Z"
              fill="#38BDF8"
              opacity="0.75"
              stroke="#07182C"
              strokeWidth="1.5"
            />
            {/* Driver Silhouette */}
            <circle cx="345" cy="54" r="5" fill="#0B2545" />
            <rect x="340" y="59" width="10" height="8" rx="2" fill="#0B2545" />

            {/* Passenger Panoramic Tinted Windows Row (Upper & Lower Deck View) */}
            <g opacity="0.9">
              {/* Window 1 */}
              <rect x="40" y="32" width="38" height="28" rx="3" fill="#FEF08A" opacity="0.35" stroke="#1E3A5F" strokeWidth="1.5" />
              <circle cx="56" cy="44" r="4" fill="#0B2545" opacity="0.7" />
              <rect x="52" y="48" width="8" height="8" rx="2" fill="#0B2545" opacity="0.7" />

              {/* Window 2 */}
              <rect x="84" y="32" width="42" height="28" rx="3" fill="#FEF08A" opacity="0.4" stroke="#1E3A5F" strokeWidth="1.5" />
              <circle cx="102" cy="44" r="4" fill="#0B2545" opacity="0.7" />
              <rect x="98" y="48" width="8" height="8" rx="2" fill="#0B2545" opacity="0.7" />

              {/* Window 3 */}
              <rect x="132" y="32" width="42" height="28" rx="3" fill="#FEF08A" opacity="0.35" stroke="#1E3A5F" strokeWidth="1.5" />
              <circle cx="150" cy="44" r="4" fill="#0B2545" opacity="0.7" />
              <rect x="146" y="48" width="8" height="8" rx="2" fill="#0B2545" opacity="0.7" />

              {/* Window 4 */}
              <rect x="180" y="32" width="42" height="28" rx="3" fill="#FEF08A" opacity="0.4" stroke="#1E3A5F" strokeWidth="1.5" />
              <circle cx="198" cy="44" r="4" fill="#0B2545" opacity="0.7" />
              <rect x="194" y="48" width="8" height="8" rx="2" fill="#0B2545" opacity="0.7" />

              {/* Window 5 */}
              <rect x="228" y="32" width="42" height="28" rx="3" fill="#FEF08A" opacity="0.35" stroke="#1E3A5F" strokeWidth="1.5" />
              <circle cx="246" cy="44" r="4" fill="#0B2545" opacity="0.7" />
              <rect x="242" y="48" width="8" height="8" rx="2" fill="#0B2545" opacity="0.7" />

              {/* Window 6 (Door Window) */}
              <rect x="276" y="32" width="44" height="28" rx="3" fill="#FEF08A" opacity="0.3" stroke="#1E3A5F" strokeWidth="1.5" />
            </g>

            {/* TravelSwift Brand Livery Badge on Side */}
            <text x="145" y="82" fill="#FFFFFF" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="1">
              TRAVELSWIFT
            </text>
            <text x="146" y="93" fill="#FDE68A" fontSize="7" fontFamily="Georgia, serif" fontWeight="bold">
              VIP LUXURY SLEEPER
            </text>

            {/* Projector LED Headlights */}
            <circle cx="376" cy="100" r="4.5" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="373" cy="105" r="3" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />

            {/* Taillights */}
            <rect x="20" y="92" width="4" height="12" rx="1" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.5" />
            <rect x="20" y="78" width="4" height="8" rx="1" fill="#F59E0B" />

            {/* Front Wheel Arch */}
            <path d="M 285 116 A 22 22 0 0 1 333 116 Z" fill="#051326" />

            {/* Rear Multi-Axle Wheel Arches (Twin Wheels) */}
            <path d="M 55 116 A 22 22 0 0 1 103 116 Z" fill="#051326" />
            <path d="M 107 116 A 22 22 0 0 1 155 116 Z" fill="#051326" />

            {/* ================= WHEEL 1 (Front Steering Wheel) ================= */}
            <g transform="translate(309, 116)">
              {/* Tire */}
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
              {/* Alloy Rim */}
              <circle cx="0" cy="0" r="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
              {/* Center Hub */}
              <circle cx="0" cy="0" r="4" fill="#0B2545" />
              {/* Spokes (Spinning) */}
              <g className="animate-bus-wheel">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1="-10" x2="0" y2="10" stroke="#475569" strokeWidth="2" />
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="#475569" strokeWidth="2" />
                <line x1="-7" y1="7" x2="7" y2="-7" stroke="#475569" strokeWidth="2" />
              </g>
            </g>

            {/* ================= WHEEL 2 (Rear Middle Axle) ================= */}
            <g transform="translate(131, 116)">
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
              <circle cx="0" cy="0" r="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill="#0B2545" />
              <g className="animate-bus-wheel">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1="-10" x2="0" y2="10" stroke="#475569" strokeWidth="2" />
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="#475569" strokeWidth="2" />
                <line x1="-7" y1="7" x2="7" y2="-7" stroke="#475569" strokeWidth="2" />
              </g>
            </g>

            {/* ================= WHEEL 3 (Rear Drive Axle) ================= */}
            <g transform="translate(79, 116)">
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
              <circle cx="0" cy="0" r="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill="#0B2545" />
              <g className="animate-bus-wheel">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1="-10" x2="0" y2="10" stroke="#475569" strokeWidth="2" />
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="#475569" strokeWidth="2" />
                <line x1="-7" y1="7" x2="7" y2="-7" stroke="#475569" strokeWidth="2" />
              </g>
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="goldLiveryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Mini Live Status Pill (Right Corner) */}
        <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-amber-400/30 text-amber-300 text-[11px] font-mono z-20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>PASSENGERS ONBOARD: <strong>34 / 36</strong></span>
        </div>
      </div>
    </div>
  );
}
