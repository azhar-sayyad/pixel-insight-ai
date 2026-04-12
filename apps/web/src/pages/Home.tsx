import Header from "../components/Header";
import UploadCard from "../components/UploadCard";
import AnalyzeButton from "../components/AnalyzeButton";
import ResultCard from "../components/ResultCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 space-y-5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Understand any image with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-gray-400 text-sm">Upload an image and get instant AI-powered insights, tags, and object detection.</p>
        </div>
        <UploadCard />
        <AnalyzeButton />
        <ResultCard />
      </main>
    </div>
  );
}
