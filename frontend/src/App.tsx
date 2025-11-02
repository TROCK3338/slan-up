import { useState, useEffect } from 'react';
import { Event } from './types';
import { eventService } from './services/api';
import FlashcardModal from './components/FlashcardModal';
import CreateModal from './components/CreateModal';
import TicketModal from './components/TicketModal';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [joinedEvent, setJoinedEvent] = useState<Event | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [attendeeName, setAttendeeName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      setEvents(data.events);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (quantity: number, name: string) => {
    try {
      const event = filteredEvents[currentIndex];
      // Join event for the specified quantity
      await eventService.joinEvent(event.id);
      const updated = await eventService.getEventById(event.id);
      setEvents(events.map(e => e.id === event.id ? updated : e));
      setJoinedEvent(updated);
      setTicketQuantity(quantity);
      setAttendeeName(name);
      setShowFlashcard(false);
      setShowTicket(true);
    } catch (error) {
      console.error('Error joining event:', error);
      alert('Failed to join event. It might be full.');
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredEvents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'}`}>
      {/* Floating Navbar */}
      <header className="absolute top-0 left-0 right-0 z-20 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              slanup
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-80 px-5 py-3 rounded-full text-sm transition-all backdrop-blur-lg border ${
                  darkMode 
                    ? 'bg-gray-900/40 text-white placeholder:text-gray-400 border-white/10'
                    : 'bg-white/40 text-gray-900 placeholder:text-gray-500 border-gray-200/30'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xl`}
              />
              <svg className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-lg border shadow-xl ${
                darkMode 
                  ? 'bg-gray-900/40 hover:bg-gray-900/60 border-white/10' 
                  : 'bg-white/40 hover:bg-white/60 border-gray-200/30'
              }`}
            >
              <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-600 backdrop-blur-lg text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-xl border border-white/20"
            >
              <span className="text-xl">+</span>
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="absolute inset-0 pt-28 overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-9xl mb-6">🔍</div>
              <h3 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No events found
              </h3>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {searchQuery ? 'Try a different search term' : 'Create your first event to get started!'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Create First Event
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="inline-flex gap-6 px-8 h-full items-center pb-8">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  darkMode={darkMode}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowFlashcard(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Flashcard Modal */}
      {showFlashcard && filteredEvents[currentIndex] && (
        <FlashcardModal
          event={filteredEvents[currentIndex]}
          isOpen={showFlashcard}
          onClose={() => setShowFlashcard(false)}
          onJoin={handleJoin}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentIndex}
          totalEvents={filteredEvents.length}
          darkMode={darkMode}
        />
      )}

      {/* Ticket Modal */}
      {showTicket && joinedEvent && (
        <TicketModal
          event={joinedEvent}
          onClose={() => setShowTicket(false)}
          darkMode={darkMode}
          ticketQuantity={ticketQuantity}
          attendeeName={attendeeName}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchEvents();
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

// Event Card Component
function EventCard({ event, darkMode, onClick }: {
  event: Event;
  darkMode: boolean;
  onClick: () => void;
}) {
  const eventDate = new Date(event.date);
  const percentage = (event.currentParticipants / event.maxParticipants) * 100;
  const isFull = percentage >= 100;

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Technology: 'from-blue-500 to-cyan-600',
      Outdoor: 'from-green-500 to-emerald-600',
      Business: 'from-purple-500 to-indigo-600',
      Arts: 'from-pink-500 to-rose-600',
      Sports: 'from-orange-500 to-amber-600',
      Food: 'from-yellow-500 to-orange-600',
      Wellness: 'from-teal-500 to-cyan-600',
      Education: 'from-indigo-500 to-blue-600',
    };
    return colors[category || ''] || 'from-gray-500 to-gray-700';
  };

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

  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 w-[420px] h-[650px] group cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 ${
        darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/50 backdrop-blur-lg border border-gray-200/50'
      }`}
    >
      <div className={`bg-gradient-to-br ${getCategoryColor(event.category)} h-[320px] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>

        <div className="relative text-[160px] group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
          {getCategoryEmoji(event.category)}
        </div>
        
        {isFull && (
          <div className="absolute top-4 right-4 bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
            FULL
          </div>
        )}
        
        {event.category && (
          <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
            {event.category}
          </div>
        )}
      </div>

      <div className="p-7 flex flex-col h-[330px]">
        <h3 className={`text-2xl font-bold mb-4 leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {event.title}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {event.description}
        </p>

        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📅</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">📍</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-1`}>
              {event.location}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">👥</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {event.currentParticipants}/{event.maxParticipants} joined
            </span>
          </div>
        </div>

        <div className={`w-full h-2.5 rounded-full overflow-hidden mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className={`h-full rounded-full transition-all ${
              isFull ? 'bg-red-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="mt-auto text-center">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} group-hover:text-blue-500 transition-colors`}>
            Click to view details →
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
