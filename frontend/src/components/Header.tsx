interface HeaderProps {
  onFilterClick: () => void;
  onCreateClick: () => void;
}

export default function Header({ onFilterClick, onCreateClick }: HeaderProps) {
  return (
    <header className="glass-dark backdrop-blur-xl border-b border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-70 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                <span className="text-3xl">🎉</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">
                SLANUP
              </h1>
              <p className="text-xs text-white/70 font-semibold">Discover Amazing Events</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onFilterClick}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20"
            >
              <span className="text-lg">🔍</span>
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button
              onClick={onCreateClick}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <span className="text-lg">✨</span>
              <span>Create</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
