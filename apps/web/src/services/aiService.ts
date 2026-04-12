import type { AnalysisResult } from "@repo/types";

const MOCK_RESULT: AnalysisResult = {
  description: "A person working on a laptop in a cafe",
  objects: ["laptop", "coffee", "table"],
  tags: ["work", "cafe", "technology"],
  insight: "Represents productivity in a relaxed setting",
};

export async function analyzeImage(_file: File): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return MOCK_RESULT;
}
