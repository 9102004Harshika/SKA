// models/PdfStreamToken.js
import mongoose from "mongoose";

const PdfStreamTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  pdfUrl:{type:String,required:true,index:true},
  localPath:{type:String,required:true,index:true},
  createdAt: { type: Date, default: Date.now, expires: '24h' }, // auto-delete after  1day
});

export default mongoose.model("PdfStream", PdfStreamTokenSchema);

