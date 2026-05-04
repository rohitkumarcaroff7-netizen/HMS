import "./hostel.css";

const roomTypes = [
  {
    title: "Single Room",
    price: "INR 6,000/month",
    description: "Private space with focused study comfort and added quiet.",
  },
  {
    title: "Double Sharing",
    price: "INR 4,000/month",
    description: "Balanced affordability with a comfortable shared experience.",
  },
  {
    title: "Triple Sharing",
    price: "INR 3,000/month",
    description: "Budget-friendly option for students who prefer community living.",
  },
];

const amenities = [
  "24/7 electricity and water supply",
  "High-speed Wi-Fi connectivity",
  "CCTV surveillance and security support",
  "Laundry and housekeeping assistance",
  "Optional meal plans and dining support",
  "Live availability updates in the booking system",
];

const Hostels = () => {
  return (
    <div className="hostels-page">
      <section className="hostel-hero">
        <div className="hostel-hero-copy">
          <span className="hostel-badge">Student Living</span>
          <h1>Comfortable, Secure, Student-First Hostel Living</h1>
          <p>
            Our hostel is designed to give students a safe, peaceful, and practical place
            to live while staying close to academics, facilities, and day-to-day support.
          </p>

          <div className="hostel-hero-points">
            <div className="hostel-point-card">
              <strong>3 room types</strong>
              <span>Single, double, and triple sharing options</span>
            </div>
            <div className="hostel-point-card">
              <strong>24/7 essentials</strong>
              <span>Power, water, security, and digital access</span>
            </div>
            <div className="hostel-point-card">
              <strong>Student focused</strong>
              <span>Built for comfort, study, and everyday convenience</span>
            </div>
          </div>
        </div>

        <div className="hostel-hero-gallery">
          <div className="hostel-gallery-main">
            <img src="./hostel_images/img7.jpg" alt="Hostel exterior" />
          </div>
          <div className="hostel-gallery-side">
            <img src="./hostel_images/img4.jpg" alt="Hostel corridor" />
            <img src="./hostel_images/img3.jpg" alt="Hostel room" />
            <img src="./hostel_images/img5.jpg" alt="Hostel common area" />
            <img src="./hostel_images/img6.jpg" alt="Hostel campus" />
          </div>
        </div>
      </section>

      <section className="hostel-overview">
        <div className="hostel-overview-card">
          <span className="hostel-section-tag">Rooms</span>
          <h2>Thoughtfully Designed Living Spaces</h2>
          <p>
            Each room is furnished with a bed, mattress, study table, wardrobe, and
            reliable lighting. Ventilation is planned for comfort, and bathroom access is
            arranged according to the selected room category.
          </p>
        </div>
        <div className="hostel-overview-media">
          <img src="./hostelproperty/roomimg1.jpg" alt="Room interior" />
        </div>
      </section>

      <section className="hostel-pricing">
        <div className="hostel-section-head">
          <span className="hostel-section-tag">Pricing</span>
          <h2>Choose The Room That Fits Your Stay</h2>
          <p>
            Flexible room types make it easier to balance privacy, comfort, and monthly cost.
          </p>
        </div>

        <div className="hostel-pricing-grid">
          {roomTypes.map((room) => (
            <article key={room.title} className="hostel-price-card">
              <h3>{room.title}</h3>
              <strong>{room.price}</strong>
              <p>{room.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hostel-feature-band">
        <div className="hostel-feature-copy">
          <span className="hostel-section-tag">Services</span>
          <h2>Reliable Services Beyond The Room</h2>
          <p>
            The hostel experience includes essential utilities, safety systems, and
            support services that make everyday student life smoother.
          </p>
          <ul className="hostel-amenities">
            {amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="hostel-feature-media">
          <img src="./hostelproperty/canteen1.jpg" alt="Hostel canteen" />
          <img src="./hostelproperty/roomimg3.png" alt="Room layout" />
        </div>
      </section>

      <section className="hostel-cta">
        <span className="hostel-section-tag">Community</span>
        <h2>Make The Hostel Feel Like Home</h2>
        <p>
          Whether you're staying for a semester or a full academic year, the goal is to
          offer a clean, secure, and resourceful environment where students can settle in
          with confidence.
        </p>
      </section>
    </div>
  );
};

export default Hostels;
