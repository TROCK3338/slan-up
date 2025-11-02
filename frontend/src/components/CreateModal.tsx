import { useState } from 'react';
import { eventService } from '../services/api';

interface CreateModalProps {
  onClose: () => void;
  onSuccess: () => void;
  darkMode: boolean;
}

export default function CreateModal({ onClose, onSuccess, darkMode }: CreateModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: 20,
    category: 'Technology',
  });

  const categories = [
    { name: 'Technology', emoji: '💻' },
    { name: 'Outdoor', emoji: '🏕️' },
    { name: 'Business', emoji: '💼' },
    { name: 'Arts', emoji: '🎨' },
    { name: 'Sports', emoji: '⚽' },
    { name: 'Food', emoji: '🍕' },
    { name: 'Wellness', emoji: '🧘' },
    { name: 'Education', emoji: '📚' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isoDate = new Date(formData.date).toISOString();
      await eventService.createEvent({ ...formData, date: isoDate });
      onSuccess();
    } catch (err) {
      alert('Failed to create event');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`max-w-2xl w-full rounded-3xl shadow-2xl my-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create New Event</h2>
            <button onClick={onClose} className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            required
            placeholder="Event Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200'}`}
          />

          <textarea
            required
            rows={3}
            placeholder="Description *"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200'}`}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Location *"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200'}`}
            />

            <input
              type="datetime-local"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
            />
          </div>

          <div>
            <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Select Category
            </p>
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.name })}
                  className={`p-3 rounded-xl text-center transition-all ${
                    formData.category === cat.name
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105 shadow-lg'
                      : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <div className="text-xs font-medium">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Max Participants: {formData.maxParticipants}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
