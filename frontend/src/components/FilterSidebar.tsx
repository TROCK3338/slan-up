interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    location: string;
    category: string;
    radius: number;
    useLocation: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const categories = [
    'All',
    'Technology',
    'Outdoor',
    'Business',
    'Arts',
    'Sports',
    'Food',
    'Wellness',
    'Education',
  ];

  const handleLocationToggle = () => {
    if (!filters.useLocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          onFiltersChange({ ...filters, useLocation: true });
        },
        (error) => {
          alert('Unable to get your location');
          console.error(error);
        }
      );
    } else {
      onFiltersChange({ ...filters, useLocation: false });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 glass-dark backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span className="text-3xl">🔍</span>
              Filters
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-all"
            >
              ✕
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto space-y-6">
            {/* Location Search */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-lg">📍</span>
                Search Location
              </label>
              <input
                type="text"
                placeholder="e.g., Bangalore"
                value={filters.location}
                onChange={(e) =>
                  onFiltersChange({ ...filters, location: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all text-white placeholder:text-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-lg">🏷️</span>
                Category
              </label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      onFiltersChange({
                        ...filters,
                        category: cat === 'All' ? '' : cat,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                      (cat === 'All' && !filters.category) ||
                      filters.category === cat
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Use Location */}
            <div>
              <button
                onClick={handleLocationToggle}
                className={`w-full px-4 py-4 rounded-xl font-bold transition-all ${
                  filters.useLocation
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {filters.useLocation ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Location Active
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg">🎯</span>
                    Use My Location
                  </span>
                )}
              </button>
            </div>

            {/* Radius Slider */}
            {filters.useLocation && (
              <div className="animate-fade-in">
                <label className="block text-sm font-bold text-white mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📏</span>
                    Radius
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-black">
                    {filters.radius} km
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filters.radius}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      radius: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(236 72 153) ${filters.radius}%, rgba(255,255,255,0.1) ${filters.radius}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/50 mt-1 font-medium">
                  <span>1 km</span>
                  <span>100 km</span>
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <button
            onClick={() =>
              onFiltersChange({
                location: '',
                category: '',
                radius: 50,
                useLocation: false,
              })
            }
            className="mt-6 w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl font-bold transition-all border-2 border-red-500/50"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
}
