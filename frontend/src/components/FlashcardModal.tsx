import { useState } from 'react';
import { Event } from '../types';

interface FlashcardModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onJoin: (quantity: number, name: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalEvents: number;
  darkMode: boolean;
}

export default function FlashcardModal({
  event,
  isOpen,
  onClose,
  onJoin,
  onNext,
  onPrevious,
  currentIndex,
  totalEvents,
  darkMode
}: FlashcardModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [attendeeName, setAttendeeName] = useState('');
  
  const eventDate = new Date(event.date);
  const percentage = (event.currentParticipants / event.maxParticipants) * 100;
  const isFull = percentage >= 100;
  const availableSpots = event.maxParticipants - event.currentParticipants;

  const getCategoryEmoji = (category?: string) => {
    const emojis: Record<string, string> = {
      Technology: '💻',
      Outdoor: '🏕️',
      Business: '💼',
      Arts: '🎨',
      Sports: '⚽',
      Food: '🍕',
      Wellness: '🧘',
      Education: '📚',
    };
    return emojis[category || ''] || '📅';
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTicketQuantity(1);
    setAttendeeName('');
    onNext();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTicketQuantity(1);
    setAttendeeName('');
    onPrevious();
  };

  const handleJoinClick = () => {
    if (!attendeeName.trim()) {
      alert('Please enter your name!');
      return;
    }
    if (ticketQuantity > availableSpots) {
      alert(`Only ${availableSpots} spot(s) available!`);
      return;
    }
    onJoin(ticketQuantity, attendeeName.trim());
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal Container with proper spacing */}
      <div className="relative w-full max-w-5xl flex flex-col items-center gap-8">
        {/* Close Button - Better positioned */}
        <button
          onClick={onClose}
          className="absolute -top-16 right-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Flashcard - No overlap */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full h-[600px] perspective-2000"
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT - Question Side */}
            <div
              onClick={handleFlip}
              className="absolute inset-0 backface-hidden cursor-pointer"
            >
              <div className={`w-full h-full rounded-3xl overflow-hidden shadow-2xl flex ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                {/* Left Side */}
                <div className="w-2/5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center relative p-8">
                  <div className="absolute top-6 left-6">
                    <span className="text-8xl">{getCategoryEmoji(event.category)}</span>
                  </div>

                  <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                    <p className="text-white font-bold text-3xl tracking-wider whitespace-nowrap">
                      {event.category || 'Event'}
                    </p>
                  </div>

                  <div className="text-[200px] opacity-90 mt-20">
                    {getCategoryEmoji(event.category)}
                  </div>
                </div>

                {/* Right Side */}
                <div className={`flex-1 p-12 flex flex-col justify-center ${
                  darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
                }`}>
                  <div className="mb-6">
                    <p className={`text-sm font-semibold mb-2 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Department: {event.category}
                    </p>
                    <h2 className={`text-5xl font-bold mb-6 leading-tight ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.title}
                    </h2>
                  </div>

                  <div className="mt-auto">
                    <p className={`text-xl font-semibold ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Flashcards
                    </p>
                    <p className={`text-4xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentIndex + 1} of {totalEvents}
                    </p>
                  </div>

                  <div className={`mt-8 p-6 rounded-2xl ${
                    darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                  }`}>
                    <p className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Question 1
                    </p>
                    <p className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Want to join this event?
                    </p>
                    <div className="mt-6 text-center">
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Click to reveal answer
                      </p>
                      <div className="mt-3">
                        <svg className={`w-8 h-8 mx-auto animate-bounce ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK - Answer Side with Booking Form */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <div className={`w-full h-full rounded-3xl overflow-hidden shadow-2xl flex ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                {/* Left Side */}
                <div className="w-2/5 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex flex-col items-center justify-center relative p-8">
                  <div className="absolute top-6 left-6">
                    <span className="text-8xl">{getCategoryEmoji(event.category)}</span>
                  </div>

                  <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                    <p className="text-white font-bold text-3xl tracking-wider whitespace-nowrap">
                      Event Details
                    </p>
                  </div>

                  <div className="text-[200px] opacity-90 mt-20">
                    🎫
                  </div>
                </div>

                {/* Right Side - Scrollable */}
                <div className={`flex-1 p-8 overflow-y-auto scrollbar-hide ${
                  darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
                }`}>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Book Your Tickets
                  </h3>

                  {/* Name Input */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="Enter your full name"
                      onClick={(e) => e.stopPropagation()}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Number of Tickets
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTicketQuantity(Math.max(1, ticketQuantity - 1));
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold transition-all ${
                          ticketQuantity <= 1
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={ticketQuantity <= 1}
                      >
                        −
                      </button>
                      <div className={`flex-1 text-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      } rounded-xl py-2`}>
                        <span className={`text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {ticketQuantity}
                        </span>
                        <span className={`text-sm ml-2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {ticketQuantity > 1 ? 'tickets' : 'ticket'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTicketQuantity(Math.min(availableSpots, ticketQuantity + 1));
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold transition-all ${
                          ticketQuantity >= availableSpots || isFull
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={ticketQuantity >= availableSpots || isFull}
                      >
                        +
                      </button>
                    </div>
                    <p className={`text-xs mt-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {availableSpots} spot{availableSpots !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  {/* Description */}
                  <div className={`p-4 rounded-2xl mb-4 ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <p className={`text-xs mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Description
                    </p>
                    <p className={`text-sm leading-relaxed ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-2xl mb-1">📅</div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Date
                      </p>
                      <p className={`font-bold text-sm ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-2xl mb-1">📍</div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Location
                      </p>
                      <p className={`font-bold text-sm line-clamp-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {event.location}
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-2xl mb-1">👥</div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Attendees
                      </p>
                      <p className={`font-bold text-sm ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {event.currentParticipants}/{event.maxParticipants}
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <div className="text-2xl mb-1">🎫</div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Status
                      </p>
                      <p className={`font-bold text-sm ${isFull ? 'text-red-500' : 'text-green-500'}`}>
                        {isFull ? 'Full' : 'Available'}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-full rounded-full transition-all ${
                          isFull ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinClick();
                    }}
                    disabled={isFull || !attendeeName.trim()}
                    className={`w-full py-3 rounded-xl font-bold text-base transition-all ${
                      isFull || !attendeeName.trim()
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isFull ? 'Event Full 😔' : `Book ${ticketQuantity} Ticket${ticketQuantity > 1 ? 's' : ''} 🎉`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - OUTSIDE and BELOW modal, proper spacing */}
        <div className="flex items-center gap-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-4 rounded-full backdrop-blur-sm transition-all ${
              currentIndex === 0
                ? 'bg-white/10 cursor-not-allowed opacity-50'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="bg-white/20 backdrop-blur-sm text-white text-lg font-semibold px-6 py-3 rounded-full">
            {currentIndex + 1} / {totalEvents}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalEvents - 1}
            className={`p-4 rounded-full backdrop-blur-sm transition-all ${
              currentIndex === totalEvents - 1
                ? 'bg-white/10 cursor-not-allowed opacity-50'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
