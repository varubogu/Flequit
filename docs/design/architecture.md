# System Architecture

## app_client & app_client_web

### Frontend

- TypeScript
- Bun
- Vite
- Qwik
- QwikUI
- TailwindCSS

### Backend (Shared)

- SQLite
- NotionAPI
- Supabase.js
- Prisma

### Backend (Client app only)

- Rust
- Tauri
- SeaORM

### Backend (Web app only)

- Rust
- Wasm
- QwikCity

### Development & Testing

- ESLint
- Prettier
- Jest
- Playwright

### Data Storage

- Local file
- SQLite
- PostgreSQL
- Notion(NotionAPI)
- Local file or SQLite is synchronized with cloud storage

## app_server

### Backend

- Supabase
- Docker
