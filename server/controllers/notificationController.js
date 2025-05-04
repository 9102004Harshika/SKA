import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
  try {
    const { title, type, description, userId } = req.body;

    const notification = new Notification({ title, type, description, userId });
    await notification.save();

    res.status(201).json({ message: "Notification created", notification });
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {}; // show global or user-specific

    const notifications = await Notification.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};
