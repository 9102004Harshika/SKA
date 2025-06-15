import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import PdfStream from "../models/PdfStream.js";
import { CACHE_DIR } from "./cachePdf.js"; // or define path directly

export const cleanupCachedPdfs = async () => {
  try {
    const files = fs.readdirSync(CACHE_DIR);

    for (const file of files) {
      if (!file.endsWith(".pdf")) continue;

      const token = path.basename(file, ".pdf");
      const fullPath = path.join(CACHE_DIR, file);

      // Check if token exists in DB
      const entry = await PdfStream.findOne({ token });

      if (!entry) {
        // No DB record → safe to delete
        fs.unlinkSync(fullPath);
        console.log("🗑️ Deleted orphaned cache:", file);
      } else if (entry.localPath !== fullPath) {
        // Mismatch (e.g. stale file) → also delete
        fs.unlinkSync(fullPath);
        console.log("🗑️ Deleted mismatched cache:", file);
      }
    }

    console.log("✅ Cache cleanup complete");
  } catch (err) {
    console.error("❌ Error cleaning up PDF cache:", err.message || err);
  }
};
