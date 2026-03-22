import { Event } from "../models/event-model.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;
    if (!title || !date || !location || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const created = await Event.create({ title, date, location, description });
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({ message: "Event deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
