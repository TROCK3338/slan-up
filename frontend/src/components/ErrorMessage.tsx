interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="animate-fade-in">
      <div className="glass rounded-3xl p-10 text-center border-2 border-red-200 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto">
        {/* Error Icon with Animation */}
        <div className="inline-block relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-5xl animate-float">😕</span>
            </div>
          </div>
        </div>

        {/* Error Title */}
        <h3 className="text-3xl font-black text-gray-900 mb-4">
          Oops! Something went wrong
        </h3>

        {/* Error Message */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-red-200">
          <p className="text-lg text-red-700 font-semibold">{message}</p>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></span>
            <span className="relative flex items-center justify-center gap-2">
              <span className="text-xl">🔄</span>
              Try Again
            </span>
          </button>
        )}

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/10 to-transparent rounded-tl-full pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-br-full pointer-events-none"></div>
      </div>
    </div>
  );
}
