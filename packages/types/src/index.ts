export interface AnalysisResult {
  description: string;
  objects: string[];
  tags: string[];
  insight: string;
}

export interface ImageStore {
  selectedImage: File | null;
  previewUrl: string | null;
  loading: boolean;
  result: AnalysisResult | null;
  error: string | null;
  setImage: (file: File, url: string) => void;
  setLoading: (loading: boolean) => void;
  setResult: (result: AnalysisResult) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
