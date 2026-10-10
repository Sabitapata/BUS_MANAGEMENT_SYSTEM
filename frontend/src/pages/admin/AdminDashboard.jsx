import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Bus, MapPin, Calendar, Users, DollarSign, PlusCircle, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('STATS'); // STATS, ADD_BUS, ADD_ROUTE, ADD_TRIP, MANIFEST
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Options for dropdowns
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [trips, setTrips] = useState([]);

  // Forms
  const [busForm, setBusForm] = useState({
    busNumber: '',
    operatorName: '',
    busType: 'AC_SLEEPER',
    totalCapacity: 36,
    amenities: 'WiFi, USB Charging, Blanket, Water',
  });

  const [routeForm, setRouteForm] = useState({
    sourceCity: '',
    destinationCity: '',
    distanceKm: 200,
    durationMinutes: 240,
  });

  const [tripForm, setTripForm] = useState({
    busId: '',
    routeId: '',
    departureTime: '',
    arrivalTime: '',
    baseFare: 500,
  });

  // Manifest
  const [selectedManifestTripId, setSelectedManifestTripId] = useState('');
  const [manifestBookings, setManifestBookings] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, routesRes, tripsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/routes'),
        api.get('/trips'),
      ]);
      setStats(statsRes.data);
      setRoutes(routesRes.data);
      setTrips(tripsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    try {
      await api.post('/admin/buses', {
        ...busForm,
        totalCapacity: Number(busForm.totalCapacity),
      });
      setStatusMsg({ type: 'success', text: `Bus ${busForm.busNumber} and seats created successfully!` });
      setBusForm({ busNumber: '', operatorName: '', busType: 'AC_SLEEPER', totalCapacity: 36, amenities: '' });
      loadData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Failed to create bus.' });
    }
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    try {
      await api.post('/admin/routes', {
        ...routeForm,
        distanceKm: Number(routeForm.distanceKm),
        durationMinutes: Number(routeForm.durationMinutes),
      });
      setStatusMsg({ type: 'success', text: `Route ${routeForm.sourceCity} ➔ ${routeForm.destinationCity} added!` });
      setRouteForm({ sourceCity: '', destinationCity: '', distanceKm: 200, durationMinutes: 240 });
      loadData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Failed to create route.' });
    }
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    try {
      await api.post('/admin/trips', {
        busId: Number(tripForm.busId),
        routeId: Number(tripForm.routeId),
        departureTime: tripForm.departureTime,
        arrivalTime: tripForm.arrivalTime,
        baseFare: Number(tripForm.baseFare),
      });
      setStatusMsg({ type: 'success', text: 'Trip scheduled successfully!' });
      setTripForm({ busId: '', routeId: '', departureTime: '', arrivalTime: '', baseFare: 500 });
      loadData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Failed to schedule trip.' });
    }
  };

  const handleViewManifest = async (tripId) => {
    setSelectedManifestTripId(tripId);
    if (!tripId) {
      setManifestBookings([]);
      return;
    }
    try {
      const res = await api.get(`/admin/trips/${tripId}/manifest`);
      setManifestBookings(res.data);
    } catch (err) {
      alert('Failed to load passenger manifest.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-300">
            Control Center
          </span>
          <h1 className="text-3xl font-bold text-[#0B2545] mt-1">Fleet Operations & Admin Console</h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
          {[
            { id: 'STATS', label: 'Overview' },
            { id: 'ADD_BUS', label: '+ Add Bus' },
            { id: 'ADD_ROUTE', label: '+ Add Route' },
            { id: 'ADD_TRIP', label: '+ Schedule Trip' },
            { id: 'MANIFEST', label: 'Passenger Manifest' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setStatusMsg({ type: '', text: '' });
              }}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-[#0B2545] text-amber-300 shadow-sm' : 'hover:text-[#0B2545]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {statusMsg.text && (
        <div
          className={`mb-6 p-4 rounded-2xl text-xs flex items-center gap-2 border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {statusMsg.text}
        </div>
      )}

      {/* TAB 1: OVERVIEW STATS */}
      {activeTab === 'STATS' && stats && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Revenue</p>
                <div className="text-2xl font-black text-slate-900">₹{stats.totalRevenue.toFixed(2)}</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Confirmed Bookings</p>
                <div className="text-2xl font-black text-slate-900">{stats.totalBookings}</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Fleet Buses</p>
                <div className="text-2xl font-black text-slate-900">{stats.totalBuses}</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Active Corridors</p>
                <div className="text-2xl font-black text-slate-900">{stats.totalRoutes}</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Scheduled Trips</p>
                <div className="text-2xl font-black text-slate-900">{stats.totalTrips}</div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Registered Accounts</p>
                <div className="text-2xl font-black text-slate-900">{stats.totalUsers}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADD BUS */}
      {activeTab === 'ADD_BUS' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Register New Bus to Fleet</h2>
          <form onSubmit={handleAddBus} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Bus Registration Number</label>
              <input
                type="text"
                required
                placeholder="e.g. MH-02-XY-9090"
                value={busForm.busNumber}
                onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Operator Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Shivam Travels"
                value={busForm.operatorName}
                onChange={(e) => setBusForm({ ...busForm, operatorName: e.target.value })}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Bus Type</label>
                <select
                  value={busForm.busType}
                  onChange={(e) => setBusForm({ ...busForm, busType: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="AC_SLEEPER">AC Sleeper</option>
                  <option value="VOLVO_MULTI_AXLE">Volvo Multi-Axle</option>
                  <option value="NON_AC_SEATER">Non-AC Seater</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Total Capacity</label>
                <input
                  type="number"
                  required
                  min="10"
                  max="60"
                  value={busForm.totalCapacity}
                  onChange={(e) => setBusForm({ ...busForm, totalCapacity: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amenities</label>
              <input
                type="text"
                placeholder="e.g. WiFi, Blanket, Water, Charging"
                value={busForm.amenities}
                onChange={(e) => setBusForm({ ...busForm, amenities: e.target.value })}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#0B2545] hover:bg-[#134074] text-amber-300 font-bold text-xs rounded-xl shadow-md border border-amber-400/30 transition-all"
            >
              Add Bus & Generate Layout
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: ADD ROUTE */}
      {activeTab === 'ADD_ROUTE' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Add Route Corridor</h2>
          <form onSubmit={handleAddRoute} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Source City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  value={routeForm.sourceCity}
                  onChange={(e) => setRouteForm({ ...routeForm, sourceCity: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Destination City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nagpur"
                  value={routeForm.destinationCity}
                  onChange={(e) => setRouteForm({ ...routeForm, destinationCity: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Distance (km)</label>
                <input
                  type="number"
                  required
                  value={routeForm.distanceKm}
                  onChange={(e) => setRouteForm({ ...routeForm, distanceKm: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  required
                  value={routeForm.durationMinutes}
                  onChange={(e) => setRouteForm({ ...routeForm, durationMinutes: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#0B2545] hover:bg-[#134074] text-amber-300 font-bold text-xs rounded-xl shadow-md border border-amber-400/30 transition-all"
            >
              Save Route Corridor
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: ADD TRIP */}
      {activeTab === 'ADD_TRIP' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Dispatch & Schedule New Trip</h2>
          <form onSubmit={handleAddTrip} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Route</label>
              <select
                required
                value={tripForm.routeId}
                onChange={(e) => setTripForm({ ...tripForm, routeId: e.target.value })}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="">Select a Route</option>
                {routes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.sourceCity} ➔ {r.destinationCity} ({r.distanceKm} km)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Bus Fleet</label>
              <select
                required
                value={tripForm.busId}
                onChange={(e) => setTripForm({ ...tripForm, busId: e.target.value })}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="">Select Bus</option>
                {trips.length > 0 &&
                  Array.from(new Set(trips.map((t) => t.busId))).map((bId) => {
                    const t = trips.find((item) => item.busId === bId);
                    return (
                      <option key={bId} value={bId}>
                        {t.operatorName} - {t.busNumber} ({t.busType})
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Departure Datetime</label>
                <input
                  type="datetime-local"
                  required
                  value={tripForm.departureTime}
                  onChange={(e) => setTripForm({ ...tripForm, departureTime: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Arrival Datetime</label>
                <input
                  type="datetime-local"
                  required
                  value={tripForm.arrivalTime}
                  onChange={(e) => setTripForm({ ...tripForm, arrivalTime: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Base Fare (₹)</label>
              <input
                type="number"
                min="50"
                required
                value={tripForm.baseFare}
                onChange={(e) => setTripForm({ ...tripForm, baseFare: e.target.value })}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0B2545] hover:bg-[#134074] text-amber-300 font-bold text-xs rounded-xl shadow-md border border-amber-400/30 transition-all"
            >
              Schedule Trip
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: PASSENGER MANIFEST */}
      {activeTab === 'MANIFEST' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Conductor & Driver Manifest</h2>
              <p className="text-xs text-slate-500">View confirmed passenger boarding list for active trips</p>
            </div>

            <select
              value={selectedManifestTripId}
              onChange={(e) => handleViewManifest(e.target.value)}
              className="text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="">Select a Trip to View Manifest</option>
              {trips.map((t) => (
                <option key={t.tripId} value={t.tripId}>
                  {t.operatorName} | {t.sourceCity} ➔ {t.destinationCity} (
                  {new Date(t.departureTime).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {selectedManifestTripId && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2">PNR Number</th>
                      <th className="py-2">Passenger Name</th>
                      <th className="py-2">Age / Gender</th>
                      <th className="py-2">Seat No.</th>
                      <th className="py-2">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {manifestBookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-400 italic">
                          No confirmed bookings yet for this trip.
                        </td>
                      </tr>
                    ) : (
                      manifestBookings.flatMap((b) =>
                        b.items.map((i) => (
                          <tr key={i.id}>
                            <td className="py-3 font-mono font-bold text-amber-900">{b.pnrNumber}</td>
                            <td className="py-3 font-semibold text-[#0B2545]">{i.passengerName}</td>
                            <td className="py-3 text-slate-500">{i.passengerAge} / {i.passengerGender}</td>
                            <td className="py-3">
                              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-bold rounded border border-amber-300">
                                {i.seat.seatNumber}
                              </span>
                            </td>
                            <td className="py-3 text-emerald-700 font-bold">{b.bookingStatus}</td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
