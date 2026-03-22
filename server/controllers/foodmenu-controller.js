import { FoodMenu } from "../models/foodmenu-model.js";

const buildMenu = (items) => ({
  Monday: items?.Monday || {},
  Tuesday: items?.Tuesday || {},
  Wednesday: items?.Wednesday || {},
  Thursday: items?.Thursday || {},
  Friday: items?.Friday || {},
  Saturday: items?.Saturday || {},
  Sunday: items?.Sunday || {},
});

export const getFoodMenu = async (req, res) => {
  try {
    const menuDoc = await FoodMenu.findOne().sort({ updatedAt: -1 });
    if (!menuDoc) {
      return res.status(200).json({ items: buildMenu({}) });
    }
    res.status(200).json({ items: buildMenu(menuDoc.items) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateFoodMenu = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || typeof items !== "object") {
      return res.status(400).json({ message: "Invalid menu data." });
    }

    const nextItems = buildMenu(items);
    const updated = await FoodMenu.findOneAndUpdate(
      {},
      { items: nextItems },
      { new: true, upsert: true },
    );

    res.status(200).json({ items: buildMenu(updated.items) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
