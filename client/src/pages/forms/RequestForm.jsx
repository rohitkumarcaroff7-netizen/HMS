import { useState } from "react";
import "./complain.css";

export const RequestForm = () => {
  const requestHighlights = [
    "Direct request tracking for hostel support needs",
    "Cleaner communication for non-complaint requests",
    "Faster routing to the right hostel team",
  ];

  const requestStats = [
    { value: "24-48 hrs", label: "Typical first response window" },
    { value: "1 form", label: "Single place to submit your request" },
    { value: "Direct", label: "Request reaches the hostel team" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/request/requestform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message || "Request submitted.");
      alert("Request Submitted");
      setFormData({ name: "", phone_no: "", subject: "", message: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="complain-page">
      <div className="complain-shell">
        <div className="complain-intro">
          <span className="complain-tag">Request</span>
          <h2>Send a Hostel Request</h2>
          <p>
            Use this form for service needs, permissions, or general hostel requests
            that are not complaints, so the team can respond more clearly.
          </p>
          <ul className="complain-intro-list">
            {requestHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="complain-intro-stats">
            {requestStats.map((item) => (
              <div key={item.label} className="complain-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="complain-card">
          <div className="complain-header">
            <h3>Request Form</h3>
            <p>Provide clear details so the hostel team can process your request quickly.</p>
          </div>
          <form onSubmit={handleSubmit} className="complain-form">
            <section className="complain-section">
              <div className="complain-section-head">
                <h4>Contact Details</h4>
                <p>These details help the team follow up with you.</p>
              </div>

              <div className="complain-form-grid">
                <div className="complain-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="complain-input"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="complain-field">
                  <label htmlFor="phone_no">Phone Number</label>
                  <input
                    type="tel"
                    id="phone_no"
                    name="phone_no"
                    placeholder="+91 1234567890"
                    className="complain-input"
                    value={formData.phone_no}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="complain-section">
              <div className="complain-section-head">
                <h4>Request Details</h4>
                <p>Share what you need and include enough context for the team to act.</p>
              </div>

              <div className="complain-field">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Example: Late entry permission"
                  className="complain-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="complain-field">
                <label htmlFor="message">Request Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Example: I need permission to enter the hostel after 9 PM on Friday due to travel."
                  rows="6"
                  className="complain-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </section>

            <button type="submit" className="complain-submit">
              Submit Request
            </button>

            {message && <p className="complain-success">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
