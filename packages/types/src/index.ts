export interface AnalysisResult {
  description: string;
  objects: string[];
  tags: string[];
  insight: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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
