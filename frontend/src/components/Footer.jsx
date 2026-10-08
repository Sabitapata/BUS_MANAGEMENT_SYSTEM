import React from 'react';
import { Bus, Heart, Shield, Award, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">TravelSwift</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier digital bus ticketing platform. Safe, reliable, and real-time intercity transit reservations.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Top Routes</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Mumbai to Pune Express</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Pune to Goa Sleeper</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Mumbai to Nashik Volvo</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Pune to Bangalore Multi-Axle</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Guarantees</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-sky-400" /> 100% Anti-Double-Booking</li>
              <li className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-sky-400" /> Verified Operators Only</li>
              <li className="flex items-center gap-2"><Headphones className="w-3.5 h-3.5 text-sky-400" /> 24x7 Customer Support</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Academic Project</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              University of Mumbai NEP 2020<br />
              Course 2173611 (Full Stack Java Programming)<br />
              Course 2174112 (DBMS Lab)<br />
              Course 2174411 (Mini Project-I)
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 TravelSwift Bus Systems. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> using Spring Boot 3 & React 18
          </p>
        </div>
      </div>
    </footer>
  );
}
