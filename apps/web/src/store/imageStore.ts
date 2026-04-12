import { create } from "zustand";
import type { ImageStore } from "@repo/types";

export const useImageStore = create<ImageStore>((set) => ({
  selectedImage: null,
  previewUrl: null,
  loading: false,
  result: null,
  error: null,
  setImage: (file, url) => set({ selectedImage: file, previewUrl: url, result: null, error: null }),
  setLoading: (loading) => set({ loading }),
  setResult: (result) => set({ result, loading: false }),
  setError: (error) => set({ error, loading: false }),
  reset: () => set({ selectedImage: null, previewUrl: null, loading: false, result: null, error: null }),
}));
