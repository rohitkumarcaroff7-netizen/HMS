import React, { useEffect, useState } from "react";
import "./contact.css";
import { useAuth } from "../../store/auth";

const ContactPage = () => {
  const contactHighlights = [
    "Ask questions about hostel services and facilities",
    "Share feedback with the administration team",
    "Get help through phone, email, or the contact form",
  ];

  const contactStats = [
    { value: "Direct", label: "Message reaches the hostel team" },
    { value: "Email", label: "Official response channel available" },
    { value: "Simple", label: "Single form for queries and feedback" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const { user } = useAuth();

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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage("");

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

        setStatusMessage("Message sent successfully.");
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.log(error);
        setStatusMessage("Message not delivered. Please try again.");
        alert("Message not delivered. Please try again.");
      }
    };

    submit();
  };

  return (
    <div className="contact-page">
      <div className="contact-shell">
        <aside className="contact-intro">
          <span className="contact-badge">Get In Touch</span>
          <h2>Contact The Hostel Team</h2>
          <p>
            Share your question, suggestion, or support request and we will help
            you through the right channel as quickly as possible.
          </p>

          <ul className="contact-intro-list">
            {contactHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="contact-intro-stats">
            {contactStats.map((item) => (
              <div key={item.label} className="contact-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

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

        <section className="contact-card">
          <div className="contact-header">
            <span className="contact-card-pill">Send A Message</span>
            <h3>Contact Form</h3>
            <p>Use your active contact details so we can reply without delay.</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <section className="contact-section">
              <div className="contact-section-head">
                <h4>Your Details</h4>
                <p>Tell us who you are and where we should reply.</p>
              </div>

              <div className="contact-form-grid">
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
                    placeholder="Enter your full name"
                    autoComplete="name"
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
                    placeholder="abc@example.com"
                    autoComplete="email"
                  />
                  <span className="contact-field-note">
                    We will reply to this email address.
                  </span>
                </div>
              </div>
            </section>

            <section className="contact-section">
              <div className="contact-section-head">
                <h4>Your Message</h4>
                <p>Share your question, feedback, or request clearly.</p>
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
                  placeholder="Write your message here..."
                ></textarea>
                <span className="contact-field-note">
                  Include hostel, room, service, or issue details if relevant.
                </span>
              </div>
            </section>

            <div className="contact-action-row">
              <button type="submit" className="contact-button">
                Send Message
              </button>

              <p className="contact-hint">
                Or email us directly at{" "}
                <a className="contact-link contact-link-inline" href="mailto:imitcuttack@rediffmail.com">
                  imitcuttack@rediffmail.com
                </a>
              </p>
            </div>

            {statusMessage && (
              <p
                className={`contact-status ${
                  statusMessage.includes("successfully") ? "is-success" : "is-error"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
