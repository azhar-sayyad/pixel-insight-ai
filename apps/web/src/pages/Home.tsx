import { useState } from "react";
import { Link } from "react-router-dom";
import UploadCard from "../components/UploadCard";
import AnalyzeButton from "../components/AnalyzeButton";
import ResultCard from "../components/ResultCard";

function LimitModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center space-y-5 animate-slide-up">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center">
          <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25-2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Unlock unlimited analysis</h2>
          <p className="text-gray-400 text-sm">You've reached the free limit. Create a free account to continue analyzing images.</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/signup"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20"
          >
            Sign Up — It's Free
          </Link>
          <Link
            to="/login"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg font-semibold text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Login
          </Link>
        </div>
        <button onClick={onClose} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <LimitModal onClose={() => setShowModal(false)} />}
      <div className="max-w-2xl mx-auto w-full px-6 py-12 space-y-5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Understand any image with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-gray-400 text-sm">Upload an image and get instant AI-powered insights, tags, and object detection.</p>
        </div>
        <UploadCard />
        <AnalyzeButton onLimitReached={() => setShowModal(true)} />
        <ResultCard />
      </div>
    </>
  );
}
