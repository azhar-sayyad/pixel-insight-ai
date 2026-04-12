# AI Image Insight

A modern full-stack monorepo for AI-powered image analysis — built with Turborepo, Bun, React, and Hono.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime & Package Manager | Bun |
| Monorepo | Turborepo |
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Backend | Hono (TypeScript) |
| AI Layer | LangChain (structure ready) |

---

## Project Structure

```
pixel-insight-ai/
├── apps/
│   ├── web/          → React frontend (Vite + Tailwind)
│   └── api/          → Hono backend (Bun)
├── packages/
│   ├── types/        → Shared TypeScript interfaces
│   └── config/       → Shared constants & configuration
├── package.json      → Bun workspaces
└── turbo.json        → Turborepo pipeline
```

### Frontend (`apps/web/src`)

```
src/
├── components/
│   ├── Header.tsx        → Sticky navbar
│   ├── UploadCard.tsx    → Drag & drop image uploader
│   ├── AnalyzeButton.tsx → Trigger analysis
│   └── ResultCard.tsx    → Display AI results
├── pages/
│   └── Home.tsx
├── store/
│   └── imageStore.ts     → Zustand store
├── services/
│   └── aiService.ts      → Mock AI service
└── types/
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+

### Install

```bash
bun install
```

### Dev (all apps in parallel)

```bash
bun dev
```

| App | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3001 |

### Build

```bash
bun run build
```

---

## Features

### Upload Card
- Drag & drop or click to upload
- Accepts JPEG, PNG, WebP, GIF (max 10MB)
- Live image preview with remove option

### Analyze Button
- Disabled until an image is selected
- Loading spinner during analysis

### Result Card
- Description of the image
- Tags displayed as chips
- Detected objects list
- AI insight panel

### UX
- Smooth fade-in / slide-up animations
- Error states with inline messages
- Fully responsive layout
- Dark minimal UI

---

## State Management

Zustand store (`imageStore.ts`) manages:

```ts
{
  selectedImage: File | null
  previewUrl:    string | null
  loading:       boolean
  result:        AnalysisResult | null
  error:         string | null
}
```

---

## Mock AI Service

The frontend uses a mock service (`services/aiService.ts`) that simulates a 1.5s API call and returns:

```json
{
  "description": "A person working on a laptop in a cafe",
  "objects": ["laptop", "coffee", "table"],
  "tags": ["work", "cafe", "technology"],
  "insight": "Represents productivity in a relaxed setting"
}
```

---

## API (`apps/api`)

Hono server running on port `3001`.

| Method | Route | Status |
|---|---|---|
| GET | `/` | Health check |
| POST | `/analyze` | Placeholder — `501 Not Implemented` |

The `/analyze` route is ready to be wired up with a LangChain / AI pipeline.

---

## Shared Packages

### `@repo/types`
```ts
interface AnalysisResult {
  description: string
  objects:     string[]
  tags:        string[]
  insight:     string
}
```

### `@repo/config`
```ts
API_BASE_URL         // http://localhost:3001
ACCEPTED_IMAGE_TYPES // jpeg, png, webp, gif
MAX_FILE_SIZE_MB     // 10
```

---

## Scripts

| Command | Description |
|---|---|
| `bun install` | Install all workspace dependencies |
| `bun dev` | Start all apps in dev mode |
| `bun run build` | Build all apps |
