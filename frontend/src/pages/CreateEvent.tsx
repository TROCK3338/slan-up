import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';
import { CreateEventData } from '../types';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: 10,
    category: 'Technology'
  });

  const categories = [
    { name: 'Technology', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
    { name: 'Outdoor', emoji: '🏔️', color: 'from-green-500 to-emerald-500' },
    { name: 'Business', emoji: '💼', color: 'from-purple-500 to-indigo-500' },
    { name: 'Arts', emoji: '🎨', color: 'from-pink-500 to-rose-500' },
    { name: 'Sports', emoji: '⚽', color: 'from-orange-500 to-amber-500' },
    { name: 'Food', emoji: '🍕', color: 'from-yellow-500 to-orange-500' },
    { name: 'Wellness', emoji: '🧘', color: 'from-teal-500 to-cyan-500' },
    { name: 'Education', emoji: '📚', color: 'from-indigo-500 to-blue-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.maxParticipants < 1) {
      alert('Maximum participants must be at least 1');
      return;
    }

    // Check if date is in the future
    const eventDate = new Date(formData.date);
    const now = new Date();
    if (eventDate < now) {
      alert('Event date must be in the future');
      return;
    }

    try {
      setLoading(true);
      const response = await eventService.createEvent(formData);
      
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-24 right-8 glass-dark text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-in-right';
      notification.innerHTML = '🎉 Event created successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
      navigate(`/events/${response.event.id}`);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create event');
      console.error('Error creating event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? parseInt(value) || 0 : value
    }));
  };

  // Get minimum date (today) in the correct format for datetime-local input
  const getMinDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-pattern relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle w-96 h-96 bg-purple-300 top-10 right-10" style={{ animationDelay: '0s' }}></div>
        <div className="particle w-64 h-64 bg-pink-300 bottom-20 left-20" style={{ animationDelay: '2s' }}></div>
        <div className="particle w-80 h-80 bg-indigo-300 top-1/2 left-1/2" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative text-7xl animate-float">✨</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Create New Event
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Share your amazing experience with the world!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-3xl shadow-2xl p-10 backdrop-blur-xl border-2 border-white/50 animate-slide-in-right">
          {/* Event Title */}
          <div className="mb-8">
            <label htmlFor="title" className="block text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Event Title
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Weekend Hiking Adventure"
              required
              className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 text-lg font-semibold placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label htmlFor="description" className="block text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event in detail... What makes it special?"
              required
              rows={4}
              className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 resize-none font-medium placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
            />
          </div>

          {/* Category Selection - Visual Cards */}
          <div className="mb-8">
            <label className="block text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏷️</span>
              Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.category === cat.name
                      ? `border-transparent bg-gradient-to-r ${cat.color} text-white shadow-2xl scale-105`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                  }`}
                >
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <div className="font-bold text-sm">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="location" className="block text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Location
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Central Park, New York"
                required
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 font-medium placeholder:text-gray-400 placeholder:font-normal hover:border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                Date & Time
                <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getMinDate()}
                required
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 font-medium hover:border-gray-300"
              />
            </div>
          </div>

          {/* Max Participants with Slider */}
          <div className="mb-8">
            <label htmlFor="maxParticipants" className="block text-lg font-black text-gray-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Maximum Participants
                <span className="text-red-500">*</span>
              </span>
              <span className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-base font-black shadow-lg">
                {formData.maxParticipants}
              </span>
            </label>
            <input
              type="range"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(236 72 153) ${formData.maxParticipants}%, rgb(243 232 255) ${formData.maxParticipants}%, rgb(252 231 243) 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
              <span>1 person</span>
              <span>100 people</span>
            </div>
          </div>

          {/* Optional: Coordinates */}
          <details className="mb-8 glass p-6 rounded-2xl border border-gray-200">
            <summary className="cursor-pointer text-lg font-black text-gray-900 hover:text-purple-600 transition-colors flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              Add Coordinates (Optional)
              <span className="text-sm font-normal text-gray-500 ml-2">- for distance calculations</span>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label htmlFor="latitude" className="block text-sm font-bold text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    latitude: e.target.value ? parseFloat(e.target.value) : undefined
                  }))}
                  placeholder="e.g., 12.9716"
                  step="0.000001"
                  min="-90"
                  max="90"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 font-medium"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-bold text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    longitude: e.target.value ? parseFloat(e.target.value) : undefined
                  }))}
                  placeholder="e.g., 77.5946"
                  step="0.000001"
                  min="-180"
                  max="180"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 font-medium"
                />
              </div>
            </div>
          </details>

          {/* Submit Buttons */}
          <div className="flex gap-6 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-5 border-4 border-gray-300 text-gray-700 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white rounded-2xl font-black text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl hover:scale-105 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></span>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="animate-spin text-2xl">⚡</span>
                    Creating...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🎉</span>
                    Create Event
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-10 glass p-8 rounded-3xl backdrop-blur-xl border-2 border-white/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-black text-2xl text-gray-900">Pro Tips for Success</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
              <span className="text-xl">✨</span>
              <span className="font-medium">Write a clear, exciting title that grabs attention</span>
            </li>
            <li className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <span className="text-xl">📝</span>
              <span className="font-medium">Provide detailed description about what to expect</span>
            </li>
            <li className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
              <span className="text-xl">📍</span>
              <span className="font-medium">Be specific about the location and meeting point</span>
            </li>
            <li className="flex items-start gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
              <span className="text-xl">👥</span>
              <span className="font-medium">Set realistic participant limits</span>
            </li>
            <li className="flex items-start gap-3 bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl">
              <span className="text-xl">🗺️</span>
              <span className="font-medium">Add coordinates for better discoverability</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
