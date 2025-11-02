export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20 animate-fade-in">
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-purple-200 border-t-transparent border-r-transparent rounded-full animate-spin"></div>
        
        {/* Middle rotating ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-pink-300 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        
        {/* Inner gradient circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-3xl animate-float">🎉</span>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <div className="inline-block">
          <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient mb-2">
            Loading awesome events
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
