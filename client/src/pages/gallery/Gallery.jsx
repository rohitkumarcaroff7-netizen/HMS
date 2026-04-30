import React, { useEffect, useState } from "react";
import "./gallery.css";

const images = [
  {
    src: "https://www.imit.ac.in/admin/uploads/Photo_gallery/15-05-2024-1715765027-gallery_3.jpg",
    title: "Campus Arrival",
    note: "The first glimpse that starts many hostel stories.",
    tag: "Welcome",
  },
  {
    src: "./galleryimages/img1.jpeg",
    title: "Morning Corners",
    note: "Quiet spots that feel different before the day gets busy.",
    tag: "Daybreak",
  },
  {
    src: "./galleryimages/img2.jpeg",
    title: "Shared Spaces",
    note: "Where conversations, plans, and laughter naturally gather.",
    tag: "Common Room",
  },
  {
    src: "./galleryimages/img3.jpeg",
    title: "Hostel Walks",
    note: "Familiar pathways that become part of everyday rhythm.",
    tag: "Routine",
  },
  {
    src: "./galleryimages/img4.jpeg",
    title: "Evening Glow",
    note: "The calm light that makes the hostel feel like home.",
    tag: "Sunset",
  },
  {
    src: "./galleryimages/img10.jpeg",
    title: "Friendly Corners",
    note: "Little places where friendships slowly turn into memories.",
    tag: "Together",
  },
  {
    src: "./galleryimages/img11.jpeg",
    title: "Daily Motion",
    note: "A frame from the energy of student life around campus.",
    tag: "Moments",
  },
  {
    src: "./galleryimages/img9.jpeg",
    title: "Study Break",
    note: "A small pause between classes, projects, and hostel chatter.",
    tag: "Pause",
  },
  {
    src: "./galleryimages/img8.jpeg",
    title: "Open Air",
    note: "Spaces that make the campus feel broad, bright, and welcoming.",
    tag: "Outside",
  },
  {
    src: "./galleryimages/img12.jpeg",
    title: "Memory Lane",
    note: "A snapshot that feels simple now and important later.",
    tag: "Keepsake",
  },
  {
    src: "./galleryimages/img14.jpeg",
    title: "Weekend Mood",
    note: "Slower hours, longer talks, and time shared with friends.",
    tag: "Weekend",
  },
  {
    src: "./galleryimages/img15.jpeg",
    title: "Hostel Stories",
    note: "Every room and corridor carries its own small narrative.",
    tag: "Stories",
  },
  {
    src: "./galleryimages/img16.jpeg",
    title: "Golden Hours",
    note: "Warm light and familiar places turned into lasting memories.",
    tag: "Golden Hour",
  },
  {
    src: "./galleryimages/img17.jpeg",
    title: "Everyday Joy",
    note: "The ordinary moments that end up being the most memorable.",
    tag: "Joy",
  },
  {
    src: "./galleryimages/img19.jpeg",
    title: "Campus Calm",
    note: "A quieter frame from the flow of hostel life.",
    tag: "Calm",
  },
  {
    src: "./galleryimages/img20.jpeg",
    title: "Life Here",
    note: "A reminder that home can be built in shared spaces too.",
    tag: "Belonging",
  },
  {
    src: "./galleryimages/img22.jpeg",
    title: "Fresh Chapter",
    note: "A still from the chapter students carry long after graduation.",
    tag: "Chapter",
  },
  {
    src: "./galleryimages/img23.jpeg",
    title: "Lasting Frames",
    note: "Small scenes collected into one memory board.",
    tag: "Memories",
  },
];

const rotationClassNames = [
  "tilt-left",
  "tilt-right",
  "tilt-soft-left",
  "tilt-soft-right",
];

export const Gallery = () => {
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
    <div className="gallery-page">
      <div className="gallery-backdrop" aria-hidden="true" />

      <section className="gallery-hero">
        <div className="gallery-hero-copy">
          <span className="gallery-badge">IMIT Hostel Memories</span>
          <h2>Moments We Keep</h2>
          <p>
            A memory board of hostel life, familiar spaces, and everyday scenes
            that quietly become part of the student journey.
          </p>
        </div>

        <aside className="gallery-note-card">
          <span className="gallery-note-label">Pinned Note</span>
          <p>
            From first-day arrivals to late-evening conversations, these frames
            capture the mood of living, learning, and growing together.
          </p>
        </aside>
      </section>

      <section className="gallery-memory-wall">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`gallery-card ${rotationClassNames[index % rotationClassNames.length]}`}
            onClick={() => handleOpen(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") handleOpen(index);
            }}
          >
            <div className="gallery-pin" aria-hidden="true" />
            <div className="gallery-photo-frame">
              <img
                src={image.src}
                alt={image.title}
                className="gallery-image"
                loading="lazy"
              />
            </div>
            <figcaption className="gallery-caption">
              <span className="gallery-tag">{image.tag}</span>
              <h3>{image.title}</h3>
              <p>{image.note}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      {activeIndex !== null && (
        <div
          className="gallery-modal"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="gallery-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-close"
              onClick={handleClose}
              aria-label="Close preview"
            >
              &times;
            </button>
            <button
              className="gallery-nav prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <div className="gallery-modal-layout">
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].title}
                className="gallery-modal-image"
              />
              <div className="gallery-modal-details">
                <span className="gallery-tag">
                  {images[activeIndex].tag}
                </span>
                <h3>{images[activeIndex].title}</h3>
                <p>{images[activeIndex].note}</p>
                <span className="gallery-modal-count">
                  Memory {activeIndex + 1} of {images.length}
                </span>
              </div>
            </div>
            <button
              className="gallery-nav next"
              onClick={handleNext}
              aria-label="Next image"
            >
              &#8250;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
