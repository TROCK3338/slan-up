import { useState } from 'react';
import { Event } from '../types';

interface EventCardFlipProps {
  event: Event;
  onJoin: () => void;
  onPass: () => void;
}

export default function EventCardFlip({ event, onJoin, onPass }: EventCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

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
    return gradients[category || ''] || 'from-purple-500 to-pink-500';
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
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <div
        className={`relative w-full h-[600px] transition-transform duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden">
          <div className="glass rounded-3xl shadow-2xl h-full flex flex-col border-4 border-white/50 overflow-hidden backdrop-blur-xl">
            {/* Gradient Top Border */}
            <div className={`h-4 bg-gradient-to-r ${getCategoryGradient(event.category)} relative`}>
              <div className="absolute inset-0 shimmer"></div>
            </div>

            {/* Card Content */}
            <div className="flex-1 flex flex-col p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                {/* Status Badge */}
                <div>
                  {isEventFull ? (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                      <span>🔴</span>
                      <span>FULL</span>
                    </div>
                  ) : spotsLeft <= 5 ? (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse">
                      <span>⚡</span>
                      <span>FILLING FAST</span>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                      <span>✨</span>
                      <span>OPEN</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                {event.category && (
                  <div className="glass-dark px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md">
                    <span className="text-2xl">{getCategoryEmoji(event.category)}</span>
                    <span className="text-white font-bold">{event.category}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                {event.title}
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed flex-grow line-clamp-4">
                {event.description}
              </p>

              {/* Event Info */}
              <div className="space-y-3 mb-6">
                {/* Date & Time */}
                <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
                  <span className="text-3xl mr-4">📅</span>
                  <div>
                    <div className="font-black text-gray-900 text-lg">
                      {eventDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-gray-600 font-semibold">
                      {eventDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
                  <span className="text-3xl mr-4">📍</span>
                  <div className="font-black text-gray-900 text-lg">{event.location}</div>
                </div>

                {/* Distance */}
                {event.distance !== undefined && (
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200">
                    <span className="text-3xl mr-4">🚗</span>
                    <div className="font-black text-blue-700 text-lg">
                      {event.distance.toFixed(1)} km away
                    </div>
                  </div>
                )}
              </div>

              {/* Click to flip hint */}
              <div className="text-center text-gray-500 text-sm font-semibold animate-pulse">
                👆 Click to see details & join
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="glass rounded-3xl shadow-2xl h-full flex flex-col border-4 border-white/50 overflow-hidden backdrop-blur-xl">
            {/* Gradient Top Border */}
            <div className={`h-4 bg-gradient-to-r ${getCategoryGradient(event.category)}`}></div>

            {/* Card Content */}
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Event Details</h2>

              {/* Full Description */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              {/* Participants */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
                  Participants
                </h3>
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">👥</span>
                      {event.currentParticipants} / {event.maxParticipants}
                    </span>
                    <span className="font-bold text-gray-600">
                      {Math.round(participationPercentage)}% Full
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        participationPercentage >= 90
                          ? 'from-red-500 to-pink-500'
                          : participationPercentage >= 70
                          ? 'from-amber-500 to-orange-500'
                          : 'from-green-500 to-emerald-500'
                      }`}
                      style={{ width: `${participationPercentage}%` }}
                    >
                      <div className="shimmer"></div>
                    </div>
                  </div>
                  <div className="mt-3 text-center font-bold text-gray-600">
                    {isEventFull ? 'No spots left' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} remaining`}
                  </div>
                </div>
              </div>

              {/* Map Link */}
              {event.latitude && event.longitude && (
                <div className="mb-6">
                  <a
                    href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xl">🗺️</span>
                    View on Google Maps
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPass();
                  }}
                  className="py-4 border-4 border-gray-300 text-gray-700 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  👋 Pass
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onJoin();
                  }}
                  disabled={isEventFull}
                  className={`py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                    isEventFull
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg hover:shadow-2xl'
                  }`}
                >
                  {!isEventFull && (
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    {isEventFull ? (
                      <>
                        <span>🔴</span>
                        <span>Full</span>
                      </>
                    ) : (
                      <>
                        <span>🎉</span>
                        <span>Join Event</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
