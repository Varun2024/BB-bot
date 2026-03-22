
# 🏀 BB-Bot

**BB-Bot** is your AI-powered basketball assistant. Get instant answers about plays, drills, stats, and more—plus optional context from Varun's work profile (kept separate and only used on request). Designed for coaches, players, and fans who want fast, clear, and reliable basketball knowledge.

---

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏆 Features

- **Basketball-centric chat**: Ask about plays, drills, stats, and get coach-friendly answers
- **Bento-style product UI**: Modern, responsive homepage with glassmorphism and dark/light mode
- **Fast, streaming chat**: Real-time answers with clear source labeling
- **Varun context**: Optionally reference Varun's work profile (kept separate and clearly labeled)
- **No PDF upload by default**: Upload UI is disabled for simplicity and security

---

## 🖼️ Screenshots

Add screenshots to `docs/screens/` to showcase the product UI and chat experience.

---

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4, shadcn/ui
- Vercel AI SDK
- Neon Postgres (pgvector optional)
- Drizzle ORM + Drizzle Kit

---

## 🗂️ Project Structure

- `app/page.tsx`: Product homepage (hero + features)
- `app/chat/page.tsx`: Chat UI and system prompt logic
- `app/api/chat/route.ts`: Chat API (with CORS)
- `components/navigation.tsx`: Navbar (with theme toggle)
- `components/ui/feature-card.tsx`: Reusable feature card
- `public/logo.svg`: Brand logo

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
NEON_DATABASE_URL=postgresql://...
```

---

## 🏗️ Local Development

1. Install dependencies: `npm install`
2. (Optional) Push schema: `npx drizzle-kit push`
3. Start dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

---

## 🚢 Deployment

Deploy to [Vercel](https://vercel.com/):

1. Import your repo in Vercel (UI)
2. Set environment variables in Project Settings
3. Click Deploy

---

## 📦 Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Lint code

---

## 🔍 API

- `POST /api/chat` — Main chat endpoint (CORS enabled)

---

## 📝 Notes

- PDF upload is disabled in the UI (can be re-enabled if needed)
- System prompt keeps basketball and Varun datasets separate
- Theme toggle and glassmorphism for modern UX

---

## 🛣️ Roadmap

- Source citations in chat output
- Query caching for repeated prompts
- Ingestion status/progress UI
- Optional conversation history

---

## ⚖️ License

This project is currently unlicensed. Add a LICENSE file to define usage terms.

## Quickstart

```bash
npm install
```

Create .env.local:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_APP_NAME=signal-desk
NEON_DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

```bash
npx drizzle-kit push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product Overview

BB-Bot combines three core experiences:

- Conversational assistant: streaming responses in a clean chat interface
- Focused knowledge: basketball plays, drills, and stats
- Optional personal context: Varun's work profile (kept separate and only used on request)

## Key Features

- Basketball-centric answers: play explanations, drill plans, and coach-friendly outputs
- Fast chat UI with streaming responses and clear source labeling
- Coach tools: shareable snippets and practice plans
- Varun context: optional references to Varun's profile (explicitly labeled)
- Polished product UI with a bento-style features layout and brand logo

## Tech Stack

- Framework: Next.js 16, React 19, TypeScript
- AI SDK: Vercel AI SDK
- Database: Neon Postgres (pgvector optional)
- ORM: Drizzle ORM + Drizzle Kit
- Auth/UI: Clerk + Tailwind CSS v4 + shadcn components

## Architecture

### System Diagram (high-level)

The chat flow optionally performs retrieval before generation when document embeddings are available. PDF ingestion is disabled in the UI by default in this branch; re-enable if needed (notes below).

## Screenshots and Demo

Add screenshots under `docs/screens/` if you want project-specific captures. The live app uses a product-style hero and bento features grid.

## Project Structure

- [app/page.tsx](app/page.tsx): landing page (hero + bento features)
- [app/chat/page.tsx](app/chat/page.tsx): chat experience and system prompt injection
- [app/upload/page.tsx](app/upload/page.tsx): upload page (currently shows disabled notice)
- [app/api/chat/route.ts](app/api/chat/route.ts): chat API + retrieval integration
- [components/navigation.tsx](components/navigation.tsx): global navbar
- [components/ai-elements/prompt-input.tsx](components/ai-elements/prompt-input.tsx): prompt input (file upload removed)
- [public/logo.svg](public/logo.svg): brand logo

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` in the project root and add any provider keys you plan to use. Example variables:

```env
# OpenRouter (or your model provider)
OPENROUTER_API_KEY=your_openrouter_api_key

# Database (optional)
NEON_DATABASE_URL=postgresql://...

```

3. (Optional) If you use Neon/Postgres with pgvector and Drizzle, push the schema:

```bash
npx drizzle-kit push
```

4. Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run linting

## API and Retrieval Notes

- Chat endpoint: POST /api/chat
- Retrieval (when enabled) is performed server-side before model generation and injected into prompts

## Notes

- The upload UI was disabled in the front-end; you can re-enable ingestion if you want to process PDFs. The project currently includes `pdf-parse` in dependencies but the UI is hidden.
- The chat injects a system prompt to keep the two data sources distinct — see [app/chat/page.tsx](app/chat/page.tsx).

---

If you'd like, I can start the dev server and report any build issues, create a small React `Logo` component to replace `<img src="/logo.svg">`, or re-enable the PDF ingestion flow.

## Data Model Notes

The documents table stores:

- id
- content
- emdeddings (vector)

Important: the column name is currently emdeddings (spelling preserved to match current schema and code). Keep this naming consistent unless you run a dedicated migration.

## Troubleshooting

- Error: missing OpenRouter key
  - Add OPENROUTER_API_KEY to .env.local

- Error: vector dimension mismatch
  - Ensure schema is pushed and embedding normalization is active

- Error: tool use endpoint not found
  - Current implementation avoids tools and uses prompt-level context injection

- Drizzle cannot connect
  - Verify NEON_DATABASE_URL and database network settings

## Deployment

Recommended: Vercel for app hosting + Neon for Postgres.

Before deploy:

1. Set all environment variables in hosting provider
2. Confirm pgvector extension exists in production database
3. Run migration/schema push against production DB

## Roadmap

- Source citations in chat output
- Query caching for repeated prompts
- Better ingestion status and progress UX
- Optional conversation history persistence

## License

This project is currently unlicensed. Add a LICENSE file to define usage terms.
