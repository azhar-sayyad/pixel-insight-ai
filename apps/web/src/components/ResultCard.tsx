import { useImageStore } from "../store/imageStore";

export default function ResultCard() {
  const { result, error } = useImageStore();

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 animate-fade-in">
        <div className="flex items-center gap-2 text-red-400">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 space-y-5 animate-slide-up">
      <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wider">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
        Analysis Result
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1.5 font-medium">Description</p>
        <p className="text-gray-200 text-sm leading-relaxed">{result.description}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Tags</p>
        <div className="flex flex-wrap gap-2">
          {result.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Detected Objects</p>
        <div className="flex flex-wrap gap-2">
          {result.objects.map((obj) => (
            <span key={obj} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
              {obj}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-4">
        <p className="text-xs text-violet-400 mb-1 font-medium">Insight</p>
        <p className="text-gray-300 text-sm leading-relaxed">{result.insight}</p>
      </div>
    </div>
  );
}
