/**
 * Returns the backend base URL for server-side fetches.
 * On Vercel, BACKEND_URL points to the deployed backend.
 * Locally, falls back to localhost:3001.
 */
export function getBackendUrl(): string {
  return process.env.BACKEND_URL || "http://localhost:3001";
}
