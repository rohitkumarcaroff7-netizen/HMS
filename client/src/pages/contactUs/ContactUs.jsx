import React, { useEffect, useState } from "react";
import "./contact.css"; // Assuming you have a CSS file for styles
import { useAuth } from "../../store/auth";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { user } = useAuth(); // Get the user data from the context

  useEffect(() => {
    if (!user) return;
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
    }));
  }, [user]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submit = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to send message");
        }

        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.log(error);
        alert("Message not delivered. Please try again.");
      }
    };

    submit();
  };

  return (
    <div className="contact-page">
      <div className="contact-shell">
        <header className="contact-hero">
          <span className="contact-badge">Get In Touch</span>
          <h2>Contact us</h2>
          <p>
            Share your questions or feedback and our team will reach out with the
            details you need.
          </p>
        </header>

        <div className="contact-grid">
          <aside className="contact-panel contact-info">
            <h3>Contact details</h3>
            <p className="contact-muted">
              Prefer email or phone? We are happy to help through either channel.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-icon">TEL</span>
                <div>
                  <p className="contact-label">Phone</p>
                  <p className="contact-value">+91-671-2506711</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-icon">MAIL</span>
                <div>
                  <p className="contact-label">Email</p>
                  <a className="contact-link" href="mailto:imitcuttack@rediffmail.com">
                    imitcuttack@rediffmail.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <section className="contact-panel">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-textarea"
                ></textarea>
              </div>
              <button type="submit" className="contact-button">
                Send Message
              </button>
              <p className="contact-hint">
                Or email us directly at{" "}
                <a className="contact-link" href="mailto:imitcuttack@rediffmail.com">
                  imitcuttack@rediffmail.com
                </a>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
     
    
   

export default ContactPage;
