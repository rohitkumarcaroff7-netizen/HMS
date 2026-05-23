import { CarouselImage } from "../models/carousel-model.js";

export const getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find()
      .select("-image.data")
      .sort({ createdAt: 1 });
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createCarouselImage = async (req, res) => {
  try {
    const { title = "" } = req.body;
    const uploadedImage = req.file;

    if (!uploadedImage) {
      return res.status(400).json({ message: "Carousel image is required." });
    }

    const imageUrl = `data:${uploadedImage.mimetype};base64,${uploadedImage.buffer.toString("base64")}`;

    const created = await CarouselImage.create({
      title,
      imageUrl,
      image: {
        data: uploadedImage.buffer,
        contentType: uploadedImage.mimetype,
        fileName: uploadedImage.originalname,
      },
    });

    const savedImage = await CarouselImage.findById(created._id).select("-image.data");
    res.status(201).json(savedImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CarouselImage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Carousel image not found." });
    }

    res.status(200).json({ message: "Carousel image deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
