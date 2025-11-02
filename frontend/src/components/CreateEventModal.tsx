import { useState } from 'react';
import { eventService } from '../services/api';
import { CreateEventData } from '../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
}

export default function CreateEventModal({
  isOpen,
  onClose,
  onEventCreated,
}: CreateEventModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: 20,
    category: 'Technology',
  });

  const categories = [
    { name: 'Technology', emoji: '💻' },
    { name: 'Outdoor', emoji: '🏔️' },
    { name: 'Business', emoji: '💼' },
    { name: 'Arts', emoji: '🎨' },
    { name: 'Sports', emoji: '⚽' },
    { name: 'Food', emoji: '🍕' },
    { name: 'Wellness', emoji: '🧘' },
    { name: 'Education', emoji: '📚' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.date
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const eventDate = new Date(formData.date);
    const now = new Date();
    if (eventDate < now) {
      alert('Event date must be in the future');
      return;
    }

    try {
      setLoading(true);
      await eventService.createEvent(formData);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-8 left-1/2 -translate-x-1/2 glass-dark text-white px-8 py-4 rounded-2xl shadow-2xl z-50 font-bold text-lg';
      notification.textContent = '🎉 Event created successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
      
      onEventCreated();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        date: '',
        maxParticipants: 20,
        category: 'Technology',
      });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="glass rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl border-2 border-white/50 animate-slide-in-right"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <span className="text-4xl">✨</span>
                Create Event
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 text-xl transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Weekend Hiking Adventure"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all font-medium"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your event..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all resize-none font-medium"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, category: cat.name })
                      }
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.category === cat.name
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.emoji}</div>
                      <div className="text-xs font-bold">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Central Park"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    min={getMinDate()}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Max Participants */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center justify-between">
                  <span>Max Participants</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs">
                    {formData.maxParticipants}
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxParticipants: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-3 bg-purple-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(236 72 153) ${formData.maxParticipants}%, rgb(243 232 255) ${formData.maxParticipants}%, rgb(252 231 243) 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? '⚡ Creating...' : '🎉 Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
