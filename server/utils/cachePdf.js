import fs from "fs";
import path from "path";
import axios from "axios";
import { pipeline } from "stream/promises";
import PdfStream from "../models/PdfStream.js";

const CACHE_DIR = path.resolve("pdf-cache");

// Ensure the cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  console.log("📁 Created cache directory:", CACHE_DIR);
}

// Function to download and cache PDF
export const cachePdf = async (pdfUrl, token, entryId) => {
  try {
    const localPath = path.join(CACHE_DIR, `${token}.pdf`);
    console.log("📦 [Background] Downloading PDF from:", pdfUrl);

    const response = await axios.get(pdfUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(localPath);
    await pipeline(response.data, writer);

    await PdfStream.findByIdAndUpdate(entryId, { localPath });
    console.log("✅ [Background] Cached PDF at:", localPath);
  } catch (err) {
    console.error("❌ [Background] Failed to cache PDF:", err.message || err);
  }
};

export { CACHE_DIR };
