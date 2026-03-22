import { Contact } from "../models/contact-model.js";

export const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Not delivered." });
  }
};
