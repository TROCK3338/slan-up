import { Link } from 'react-router-dom';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isEventFull = event.currentParticipants >= event.maxParticipants;
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  const getCategoryGradient = (category?: string) => {
    const gradients: { [key: string]: string } = {
      Technology: 'from-blue-500 to-cyan-500',
      Outdoor: 'from-green-500 to-emerald-500',
      Business: 'from-purple-500 to-indigo-500',
      Arts: 'from-pink-500 to-rose-500',
      Sports: 'from-orange-500 to-amber-500',
      Food: 'from-yellow-500 to-orange-500',
      Wellness: 'from-teal-500 to-cyan-500',
      Education: 'from-indigo-500 to-blue-500',
    };
    return gradients[category || ''] || 'from-gray-500 to-gray-600';
  };

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
    <Link to={`/events/${event.id}`} className="block group h-full">
      <div className="relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-purple-300 h-full flex flex-col transform hover:-translate-y-2">
        
        {/* Gradient Top Border - Make it thicker and more visible */}
        <div className={`h-3 bg-gradient-to-r ${getCategoryGradient(event.category)} relative overflow-hidden`}>
          <div className="absolute inset-0 shimmer opacity-50"></div>
        </div>

        {/* Card Content */}
        <div className="flex-1 flex flex-col p-6">
          
          {/* Header with Badges */}
          <div className="flex items-start justify-between mb-4 gap-3">
            {/* Status Badge - Left side */}
            <div className="flex-shrink-0">
              {isEventFull ? (
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1">
                  <span>🔴</span>
                  <span>FULL</span>
                </div>
              ) : spotsLeft <= 5 ? (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1 animate-pulse">
                  <span>⚡</span>
                  <span>HOT</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1">
                  <span>✨</span>
                  <span>OPEN</span>
                </div>
              )}
            </div>

            {/* Category Badge - Right side */}
            {event.category && (
              <div className="glass-dark px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-md flex-shrink-0">
                <span className="text-lg">{getCategoryEmoji(event.category)}</span>
                <span className="text-white font-bold text-xs">{event.category}</span>
              </div>
            )}
          </div>

          {/* Title - FIXED: Removed min-h constraint that was cutting off text */}
          <h3 className="text-2xl font-black text-gray-900 mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
            {event.description}
          </p>

          {/* Event Info Section */}
          <div className="space-y-2.5 mb-4">
            {/* Date & Time */}
            <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-3 group-hover:from-purple-50 group-hover:to-pink-50 transition-all duration-300">
              <span className="text-xl mr-3">📅</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 truncate">
                  {eventDate.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-xs text-gray-600">
                  {eventDate.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-3 group-hover:from-purple-50 group-hover:to-pink-50 transition-all duration-300">
              <span className="text-xl mr-3">📍</span>
              <span className="line-clamp-1 font-semibold flex-1 min-w-0">{event.location}</span>
            </div>

            {/* Distance (if available) */}
            {event.distance !== undefined && (
              <div className="flex items-center text-sm bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 border-2 border-purple-200">
                <span className="text-xl mr-3">🚗</span>
                <span className="font-black text-purple-700">{event.distance.toFixed(1)} km away</span>
              </div>
            )}
          </div>

          {/* Participants Section */}
          <div className="mt-auto pt-4 border-t-2 border-gray-100">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">👥</span>
                <span className="text-sm font-black text-gray-900">
                  {event.currentParticipants} / {event.maxParticipants}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {Math.round(participationPercentage)}% Full
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner mb-3">
              <div 
                className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r relative ${
                  participationPercentage >= 90 ? 'from-red-500 to-pink-500' :
                  participationPercentage >= 70 ? 'from-amber-500 to-orange-500' :
                  'from-green-500 to-emerald-500'
                }`}
                style={{ 
                  width: `${participationPercentage}%`,
                  boxShadow: `0 0 15px ${
                    participationPercentage >= 90 ? 'rgba(239, 68, 68, 0.6)' :
                    participationPercentage >= 70 ? 'rgba(245, 158, 11, 0.6)' :
                    'rgba(16, 185, 129, 0.6)'
                  }`
                }}
              >
                <div className="absolute inset-0 shimmer"></div>
              </div>
            </div>

            {/* Bottom Action Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  isEventFull ? 'bg-red-500 animate-pulse' : spotsLeft <= 5 ? 'bg-amber-500 animate-pulse' : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-bold text-gray-700">
                  {isEventFull ? 'No spots left' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left`}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-purple-600 font-black text-sm group-hover:text-pink-600 transition-colors">
                <span>View Details</span>
                <span className="transform group-hover:translate-x-1 transition-transform text-base">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-indigo-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-indigo-500/5 transition-all duration-500 pointer-events-none rounded-3xl"></div>
        
        {/* Decorative Corner Glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-2xl group-hover:from-purple-400/30 transition-all duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
}
