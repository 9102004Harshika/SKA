import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["info", "warning", "success", "error"],
    required: true,
  },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // null = global
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
