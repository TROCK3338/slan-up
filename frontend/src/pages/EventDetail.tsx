import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';
import { Event } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEvent = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getEventById(id);
      setEvent(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch event details');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async () => {
    if (!id || !event) return;

    try {
      setActionLoading(true);
      const data = await eventService.joinEvent(id);
      setEvent(data.event);
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-24 right-8 glass-dark text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-in-right';
      notification.innerHTML = '🎉 Successfully joined the event!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to join event');
      console.error('Error joining event:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveEvent = async () => {
    if (!id || !event) return;

    try {
      setActionLoading(true);
      const data = await eventService.leaveEvent(id);
      setEvent(data.event);
      const notification = document.createElement('div');
      notification.className = 'fixed top-24 right-8 glass-dark text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-in-right';
      notification.innerHTML = 'You have left the event';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to leave event');
      console.error('Error leaving event:', err);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pattern py-12">
        <div className="max-w-5xl mx-auto px-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-pattern py-12">
        <div className="max-w-5xl mx-auto px-4">
          <ErrorMessage 
            message={error || 'Event not found'} 
            onRetry={error ? fetchEvent : undefined}
          />
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              ← Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isEventFull = event.currentParticipants >= event.maxParticipants;
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  const getCategoryEmoji = (category?: string) => {
    const emojis: { [key: string]: string } = {
      Technology: '💻',
      Outdoor: '🏔️',
      Business: '💼',
      Arts: '🎨',
      Sports: '⚽',
      Food: '🍕',
      Wellness: '🧘',
      Education: '📚',
    };
    return emojis[category || ''] || '📅';
  };

  return (
    <div className="min-h-screen bg-pattern relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle w-96 h-96 bg-purple-300 top-20 left-10" style={{ animationDelay: '0s' }}></div>
        <div className="particle w-64 h-64 bg-pink-300 bottom-40 right-20" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="group mb-8 px-6 py-3 glass rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <span className="text-xl transform group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Events</span>
        </button>

        {/* Event Card */}
        <div className="glass rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border-2 border-white/50 animate-fade-in">
          {/* Hero Header with Gradient */}
          <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white p-12 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {event.category && (
                <div className="inline-flex items-center gap-2 glass-dark px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg backdrop-blur-md">
                  <span className="text-2xl">{getCategoryEmoji(event.category)}</span>
                  <span>{event.category}</span>
                </div>
              )}
              
              <h1 className="text-5xl font-black mb-6 leading-tight drop-shadow-lg">
                {event.title}
              </h1>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-4">
                <div className="glass-dark px-6 py-3 rounded-2xl backdrop-blur-md shadow-lg flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <div className="font-bold text-lg">
                      {eventDate.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm opacity-90">
                      {eventDate.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div className="glass-dark px-6 py-3 rounded-2xl backdrop-blur-md shadow-lg flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <div className="font-bold text-lg">{event.currentParticipants} / {event.maxParticipants}</div>
                    <div className="text-sm opacity-90">Participants</div>
                  </div>
                </div>

                {event.distance !== undefined && (
                  <div className="glass-dark px-6 py-3 rounded-2xl backdrop-blur-md shadow-lg flex items-center gap-3">
                    <span className="text-2xl">🚗</span>
                    <div>
                      <div className="font-bold text-lg">{event.distance.toFixed(1)} km</div>
                      <div className="text-sm opacity-90">Away from you</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content Section */}
          <div className="p-12">
            {/* Description */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                About This Event
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-100">
                {event.description}
              </p>
            </div>

            {/* Location */}
            <div className="mb-10">
              <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                Location
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-100">
                <p className="text-gray-900 text-xl font-semibold mb-3 flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  {event.location}
                </p>
                {event.latitude && event.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-xl">🗺️</span>
                    View on Google Maps
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>

            {/* Participants Progress */}
            <div className="mb-10">
              <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                Participant Status
              </h3>
              <div className="glass p-8 rounded-3xl border-2 border-white/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    {event.currentParticipants} of {event.maxParticipants} spots filled
                  </span>
                  <div className={`px-5 py-2 rounded-full font-black text-lg ${
                    isEventFull 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  }`}>
                    {isEventFull ? '🔴 Full' : `✨ ${spotsLeft} spots left`}
                  </div>
                </div>
                
                {/* Progress Bar with Glow */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 relative ${
                        participationPercentage >= 90 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                        participationPercentage >= 70 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                        'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ 
                        width: `${participationPercentage}%`,
                        boxShadow: `0 0 20px ${
                          participationPercentage >= 90 ? 'rgba(239, 68, 68, 0.6)' :
                          participationPercentage >= 70 ? 'rgba(245, 158, 11, 0.6)' :
                          'rgba(16, 185, 129, 0.6)'
                        }`
                      }}
                    >
                      <div className="absolute inset-0 shimmer"></div>
                    </div>
                  </div>
                  <div className="text-center mt-3 font-bold text-gray-600">
                    {Math.round(participationPercentage)}% Capacity
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6">
              <button
                onClick={handleJoinEvent}
                disabled={isEventFull || actionLoading}
                className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-lg relative overflow-hidden group ${
                  isEventFull
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white hover:shadow-2xl hover:scale-105'
                }`}
              >
                {!isEventFull && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></span>
                )}
                <span className="relative flex items-center justify-center gap-2">
                  {actionLoading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Processing...
                    </>
                  ) : isEventFull ? (
                    <>
                      <span>🔴</span>
                      Event Full
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🎉</span>
                      Join Event
                    </>
                  )}
                </span>
              </button>
              
              <button
                onClick={handleLeaveEvent}
                disabled={event.currentParticipants === 0 || actionLoading}
                className="flex-1 py-5 rounded-2xl font-black text-xl border-4 border-red-500 text-red-600 hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <span className="animate-spin">⚡</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">👋</span>
                    Leave Event
                  </>
                )}
              </button>
            </div>

            {/* Event Meta */}
            <div className="mt-10 pt-8 border-t-2 border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <span className="text-sm font-bold text-gray-600">Event ID</span>
                  <div className="font-mono text-sm text-gray-900 mt-1 font-bold">{event.id}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <span className="text-sm font-bold text-gray-600">Created On</span>
                  <div className="text-sm text-gray-900 mt-1 font-bold">
                    {new Date(event.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
