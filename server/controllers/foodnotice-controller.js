import { FoodNotice } from "../models/foodnotice-model.js";

const defaultNotice = {
  title: "Food Notice",
  notices: [],
};

export const getFoodNotice = async (req, res) => {
  try {
    const notice = await FoodNotice.findOne().sort({ updatedAt: -1 });
    res.status(200).json(notice || defaultNotice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const upsertFoodNotice = async (req, res) => {
  try {
    const { title, notices } = req.body;

    if (!Array.isArray(notices)) {
      return res.status(400).json({ message: "Notices must be an array." });
    }

    const payload = {
      title: (title || "Food Notice").trim(),
      notices: notices.map((item) => String(item).trim()).filter(Boolean),
    };

    const existing = await FoodNotice.findOne().sort({ updatedAt: -1 });

    if (existing) {
      existing.title = payload.title;
      existing.notices = payload.notices;
      await existing.save();
      return res.status(200).json(existing);
    }

    const created = await FoodNotice.create(payload);
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
