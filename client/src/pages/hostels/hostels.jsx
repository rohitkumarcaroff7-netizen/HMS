import "./hostel.css";

const Hostels = () => {
  return (
    <div className="hostels-page bg-gradient-to-r from-blue-100 to-blue-300 ">
      <section className="hostel-hero">
        <div className="hostel-hero-grid">
          <div className="hero-main ">
            <img src="./hostel_images/img7.jpg" alt="Hostel exterior" />
          </div>
          <div className="hero-stack">
            <img src="./hostel_images/img4.jpg" alt="Hostel corridor" />
            <img src="./hostel_images/img3.jpg" alt="Hostel room" />
          </div>
          <div className="hero-stack">
            <img src="./hostel_images/img5.jpg" alt="Hostel common area" />
            <img src="./hostel_images/img6.jpg" alt="Hostel campus" />
          </div>
        </div>

        <div className="hostel-hero-text">
          <h1>Comfortable, Secure, Student-First Living</h1>
          <p>
            Our hostel offers a comfortable and secure living environment tailored to meet the
            needs of students and working professionals. Rooms are available in three categories:
            Single, Double Sharing, and Triple Sharing.
          </p>
        </div>
      </section>

      <section className="hostel-section">
        <div className="hostel-text">
          <h2>Thoughtfully Designed Rooms</h2>
          <p>
            Each room is fully furnished with a bed, mattress, study table, wardrobe, and ample
            lighting. Rooms are well ventilated with clean private or shared bathrooms depending
            on the selected category.
          </p>
        </div>
        <div className="hostel-media">
          <img src="./hostelproperty/roomimg1.jpg" alt="Room interior" />
        </div>
      </section>

      <section className="hostel-section reverse">
        <div className="hostel-media">
          <img src="./hostelproperty/roomimg3.png" alt="Room layout" />
        </div>
        <div className="hostel-text">
          <h2>Reliable Services & Pricing</h2>
          <p>
            Enjoy 24/7 electricity and water, high-speed Wi-Fi, CCTV surveillance, and security
            support. Pricing is designed to stay affordable:
          </p>
          <ul>
            <li>Single Room: INR 6,000/month</li>
            <li>Double Sharing: INR 4,000/month</li>
            <li>Triple Sharing: INR 3,000/month</li>
          </ul>
        </div>
      </section>

      <section className="hostel-section">
        <div className="hostel-text">
          <h2>More Than Just Rooms</h2>
          <p>
            Additional facilities include laundry, housekeeping, optional meal plans, and
            real-time availability updates in the booking system.
          </p>
        </div>
        <div className="hostel-media">
          <img src="./hostelproperty/canteen1.jpg" alt="Hostel canteen" />
        </div>
      </section>

      <section className="hostel-cta">
        <h2>Make the Hostel Your Home</h2>
        <p>
          Whether you're staying for a semester or a full academic year, our hostel aims to
          provide a peaceful, clean, and resourceful atmosphere.
        </p>
      </section>
    </div>
  );
};

export default Hostels;
