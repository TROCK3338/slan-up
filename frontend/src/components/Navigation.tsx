interface NavigationProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export default function Navigation({
  currentIndex,
  total,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: NavigationProps) {
  return (
    <div className="glass backdrop-blur-xl border-t border-white/10 py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={!canGoPrev}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
              canGoPrev
                ? 'bg-white/20 hover:bg-white/30 text-white hover:scale-105'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Progress Dots */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(total, 10) }).map((_, idx) => {
                const isActive = idx === currentIndex;
                const isPast = idx < currentIndex;
                
                return (
                  <div
                    key={idx}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600'
                        : isPast
                        ? 'w-3 bg-white/50'
                        : 'w-3 bg-white/20'
                    }`}
                  />
                );
              })}
            </div>
            
            {/* Counter */}
            <div className="glass-dark px-4 py-2 rounded-full backdrop-blur-md">
              <span className="text-white font-black text-sm">
                {currentIndex + 1} / {total}
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
              canGoNext
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white hover:scale-105 shadow-lg'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
