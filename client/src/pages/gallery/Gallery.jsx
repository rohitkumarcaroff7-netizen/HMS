import React, { useEffect, useState } from "react";
import "./gallery.css"

const images = [
  "https://www.imit.ac.in/admin/uploads/Photo_gallery/15-05-2024-1715765027-gallery_3.jpg",
  "./galleryimages/img1.jpeg",
  "./galleryimages/img2.jpeg",
  "./galleryimages/img3.jpeg",
  "./galleryimages/img4.jpeg",
  "./galleryimages/img10.jpeg",
  "./galleryimages/img11.jpeg",
  "./galleryimages/img9.jpeg",
  "./galleryimages/img8.jpeg",
  "./galleryimages/img12.jpeg",
  "./galleryimages/img14.jpeg",
  "./galleryimages/img15.jpeg",
  "./galleryimages/img16.jpeg",
  "./galleryimages/img17.jpeg",
 
  "./galleryimages/img19.jpeg",
  "./galleryimages/img20.jpeg",
  "./galleryimages/img22.jpeg",
  "./galleryimages/img23.jpeg",
];

export const Gallery=()=> {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleOpen = (index) => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);
  const handlePrev = () =>
    setActiveIndex((prev) =>
      prev === null ? prev : (prev - 1 + images.length) % images.length
    );
  const handleNext = () =>
    setActiveIndex((prev) =>
      prev === null ? prev : (prev + 1) % images.length
    );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <div className="gallery-page bg-gradient-to-r from-amber-50 to-blue-300">
      <header className="gallery-hero">
        <span className="gallery-badge">IMIT Hostels</span>
        <h2>Hostel Gallery</h2>
        <p>
          A quick look at our hostel spaces, common areas, and student life at
          IMIT.
        </p>
      </header>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <figure
            key={index}
            className="gallery-card"
            onClick={() => handleOpen(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") handleOpen(index);
            }}
          >
            <img
              src={src}
              alt={`Hostel ${index + 1}`}
              className="gallery-image"
              loading="lazy"
            />
            <figcaption>Hostel view {index + 1}</figcaption>
          </figure>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="gallery-modal"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-close"
              onClick={handleClose}
              aria-label="Close preview"
            >
              ×
            </button>
            <button
              className="gallery-nav prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              src={images[activeIndex]}
              alt={`Hostel ${activeIndex + 1}`}
              className="gallery-modal-image"
            />
            <button
              className="gallery-nav next"
              onClick={handleNext}
              aria-label="Next image"
            >
              ›
            </button>
            <p className="gallery-modal-caption">
              Hostel view {activeIndex + 1}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}



  
  
