import { useCallback, useRef, useState } from "react";
import { useImageStore } from "../store/imageStore";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB } from "@repo/config";

export default function UploadCard() {
  const { previewUrl, setImage, setError, reset } = useImageStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError("Please upload a valid image (JPEG, PNG, WebP, GIF).");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File size must be under ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      setImage(file, URL.createObjectURL(file));
    },
    [setImage, setError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (previewUrl) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-fade-in">
        <img src={previewUrl} alt="Preview" className="w-full max-h-80 object-cover" />
        <button
          onClick={reset}
          className="absolute top-3 right-3 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full p-1.5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`
        border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
        ${dragging
          ? "border-violet-500 bg-violet-50 dark:bg-violet-500/5"
          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-900/50"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg className="w-7 h-7 text-gray-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">Drop your image here</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm">or click to browse · PNG, JPG, WebP up to {MAX_FILE_SIZE_MB}MB</p>
    </div>
  );
}
