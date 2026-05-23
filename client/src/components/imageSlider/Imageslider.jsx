import React, { useEffect, useState } from "react";

const fallbackImages = [
  "./hostel_images/img1.jpg",
  "./hostel_images/img2.jpg",
  "./hostel_images/img3.jpg",
  "./hostel_images/img6.jpg",
  "./hostel_images/img4.jpg",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState(fallbackImages);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carousel");
        const data = await response.json().catch(() => []);

        if (!response.ok || !Array.isArray(data) || data.length === 0) {
          return;
        }

        setImages(data.map((item) => item.imageUrl).filter(Boolean));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCarouselImages();
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="relative h-100 w-full max-w-3xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            className="h-100 w-full flex-shrink-0 object-cover"
            alt={`Carousel slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white text-black h-7 w-3 rounded-full"
        aria-label="Previous image"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-black h-7 w-3 rounded-full"
        aria-label="Next image"
      >
        &gt;
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
