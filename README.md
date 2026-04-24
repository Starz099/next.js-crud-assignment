# Bevysquare CRUD App

A simple User Management tool built for the Bevysquare assignment. It uses Next.js (App Router) and JSONPlaceholder for the backend.

## How to Run
1. `pnpm install`
2. `pnpm dev`
3. Open `http://localhost:3000`

## Core Decisions

### 1. Hybrid Rendering (Server + Client)
I used Server Components for the initial data fetch (`getUsers`, `getUserById`). This keeps the page load fast and improves SEO. For the interactive parts (Update/Delete), I used Client Components to handle state and optimistic updates.

### 2. Optimistic Updates
When you update a user's name or email, the UI updates immediately before the API call finishes. If the call fails, the state reverts back to the original data. This makes the app feel instant despite network lag.

### 3. Axios & Interceptors
I went with Axios because interceptors are cleaner for global error handling. If an API call fails anywhere, the interceptor catches it and logs it, keeping the individual components from being cluttered with redundant `try/catch` logic where possible.

### 4. Simple UI & Colocation
The UI is intentionally minimal, just standard borders, spacing, and black/white buttons. 

## API Usage
- `GET /users`: List all users.
- `GET /users/:id`: Fetch specific user.
- `PUT /users/:id`: Update user info (Local state updates + API call).
- `DELETE /users/:id`: Remove user and redirect.
