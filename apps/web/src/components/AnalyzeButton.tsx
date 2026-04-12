import { useImageStore } from "../store/imageStore";
import { analyzeImage } from "../services/aiService";
import { useGuestLimit, GUEST_LIMIT } from "../hooks/useGuestLimit";
import { useAuthStore } from "../store/authStore";

export default function AnalyzeButton({ onLimitReached }: { onLimitReached?: () => void }) {
  const { selectedImage, loading, setLoading, setResult, setError } = useImageStore();
  const { isAuthenticated } = useAuthStore();
  const { isLimitReached, increment, count } = useGuestLimit();

  const handleAnalyze = async () => {
    if (!selectedImage || isLimitReached) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeImage(selectedImage);
      setResult(result);
      if (!isAuthenticated) increment();
    } catch {
      setError("Analysis failed. Please try again.");
    }
  };

  if (isLimitReached) {
    return (
      <div className="space-y-3">
        <div className="w-full py-3.5 rounded-xl text-sm text-center bg-gray-800/60 border border-gray-700 text-gray-400">
          Free limit reached
        </div>
        <button
          onClick={onLimitReached}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Unlock Unlimited Analysis
        </button>
      </div>
    );
  }

  const disabled = !selectedImage || loading;

  return (
    <div className="space-y-2">
      <button
        onClick={handleAnalyze}
        disabled={disabled}
        className={`
          w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
          ${disabled
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5"
          }
        `}
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Analyze Image
          </>
        )}
      </button>

      {!isAuthenticated && (
        <p className="text-center text-xs text-gray-500">
          Free usage: <span className="text-gray-300 font-medium">{count} / {GUEST_LIMIT}</span> used
        </p>
      )}
    </div>
  );
}
