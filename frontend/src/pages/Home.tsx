import { useState, useEffect } from 'react';
import { eventService } from '../services/api';
import { Event } from '../types';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [radiusFilter, setRadiusFilter] = useState<number>(50);
  const [useLocationFilter, setUseLocationFilter] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const categories = ['All', 'Technology', 'Outdoor', 'Business', 'Arts', 'Sports', 'Food', 'Wellness', 'Education'];

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: any = {};
      
      if (searchLocation) {
        filters.location = searchLocation;
      }
      
      if (selectedCategory && selectedCategory !== 'All') {
        filters.category = selectedCategory;
      }

      if (useLocationFilter && userLocation) {
        filters.latitude = userLocation.lat;
        filters.longitude = userLocation.lng;
        filters.radius = radiusFilter;
      }

      const data = await eventService.getEvents(filters);
      setEvents(data.events);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch events. Please try again.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setUseLocationFilter(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchLocation, selectedCategory, useLocationFilter, radiusFilter]);

  return (
    <div className="min-h-screen bg-pattern relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle w-64 h-64 bg-purple-300 top-10 left-10" style={{ animationDelay: '0s' }}></div>
        <div className="particle w-96 h-96 bg-pink-300 bottom-20 right-20" style={{ animationDelay: '2s' }}></div>
        <div className="particle w-48 h-48 bg-blue-300 top-1/2 left-1/3" style={{ animationDelay: '4s' }}></div>
        <div className="particle w-80 h-80 bg-indigo-300 bottom-1/3 left-2/3" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-30 animate-pulse"></div>
            <h1 className="relative text-6xl md:text-7xl font-black mb-2">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                Discover Amazing Events
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Find and join incredible experiences happening around you
            <span className="inline-block ml-2 animate-float">🎉</span>
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <div className="glass px-6 py-3 rounded-2xl shadow-lg">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {events.length}+
              </div>
              <div className="text-sm text-gray-600 font-semibold">Active Events</div>
            </div>
            <div className="glass px-6 py-3 rounded-2xl shadow-lg">
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                8
              </div>
              <div className="text-sm text-gray-600 font-semibold">Categories</div>
            </div>
            <div className="glass px-6 py-3 rounded-2xl shadow-lg">
              <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm text-gray-600 font-semibold">Possibilities</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-3xl shadow-2xl p-8 mb-12 backdrop-blur-xl border-2 border-white/50 animate-slide-in-right">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">Find Your Perfect Event</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location Search */}
            <div className="relative group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg">📍</span>
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., Bangalore"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 font-medium placeholder:text-gray-400 group-hover:border-gray-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg">🏷️</span>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 font-medium group-hover:border-gray-300 appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location-based Filter */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                Nearby Events
              </label>
              <button
                onClick={getUserLocation}
                disabled={useLocationFilter}
                className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                  useLocationFilter
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-default'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:scale-105'
                }`}
              >
                {useLocationFilter ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Location Active
                  </span>
                ) : (
                  'Use My Location'
                )}
              </button>
            </div>

            {/* Radius Slider */}
            {useLocationFilter && (
              <div className="relative animate-fade-in">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📏</span>
                    Radius
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-black">
                    {radiusFilter} km
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={radiusFilter}
                  onChange={(e) => setRadiusFilter(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(236 72 153) ${radiusFilter}%, rgb(243 232 255) ${radiusFilter}%, rgb(252 231 243) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1 font-medium">
                  <span>1 km</span>
                  <span>100 km</span>
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {(searchLocation || selectedCategory || useLocationFilter) && (
            <div className="mt-6 text-center animate-fade-in">
              <button
                onClick={() => {
                  setSearchLocation('');
                  setSelectedCategory('');
                  setUseLocationFilter(false);
                  setUserLocation(null);
                  setRadiusFilter(50);
                }}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                ✖ Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={fetchEvents} />
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-2 h-10 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                {events.length === 0 ? 'No Events' : `${events.length} Event${events.length === 1 ? '' : 's'} Found`}
              </h2>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="inline-block mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-20"></div>
                  <div className="relative text-8xl animate-float">🔍</div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">No events found</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                  Try adjusting your filters or check back later for new exciting events!
                </p>
                <button
                  onClick={() => {
                    setSearchLocation('');
                    setSelectedCategory('');
                    setUseLocationFilter(false);
                    setUserLocation(null);
                    setRadiusFilter(50);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
