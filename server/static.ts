import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Use a more robust path resolution that works both in development and production
  // In development, __dirname is server/. In production (dist/index.cjs), it is dist/.
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  // Check if build exists, otherwise fallback to a helpful error or development mode
  if (!fs.existsSync(distPath)) {
    // Only throw in production to avoid crashing dev server if dist isn't built yet
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Could not find the build directory: ${distPath}. Make sure to run 'npm run build' first.`
      );
    }
    return;
  }

  // Cache control for static assets to speed up delivery
  app.use(express.static(distPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
