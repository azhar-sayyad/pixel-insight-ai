import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { AnalysisResult } from "@repo/types";

const app = new Hono();

app.use("*", logger());
app.use("*", cors({ origin: "http://localhost:5173" }));

app.get("/", (c) => c.json({ status: "ok", service: "AI Image Insight API" }));

// POST /analyze — placeholder for AI integration
app.post("/analyze", async (c) => {
  // TODO: parse multipart form, run LangChain/AI pipeline
  const result: AnalysisResult = {
    description: "",
    objects: [],
    tags: [],
    insight: "",
  };
  return c.json(result, 501); // 501 Not Implemented until AI layer is wired
});

export default {
  port: 3001,
  fetch: app.fetch,
};
