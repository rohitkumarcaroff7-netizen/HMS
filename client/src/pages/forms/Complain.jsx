import React, { useState } from "react";

import "./complain.css";

export const ComplaintForm = () => {
  const supportHighlights = [
    "Structured complaint tracking for hostel issues",
    "Faster escalation for urgent maintenance problems",
    "Clearer communication with the hostel support team",
  ];

  const supportStats = [
    { value: "24-48 hrs", label: "Typical first response window" },
    { value: "1 form", label: "Single place to report your issue" },
    { value: "Direct", label: "Complaint reaches the hostel team" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/complain/complainform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message || "Complaint submitted.");
      alert("Message Submitted");
      setFormData({ name: "", phone_no: "", message: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="complain-page">
      <div className="complain-shell">
        <div className="complain-intro">
          <span className="complain-tag">Support</span>
          <h2>Tell Us What Went Wrong</h2>
          <p>
            Share the issue clearly so the hostel team can review it quickly,
            contact you if needed, and move it to the right person without delay.
          </p>
          <ul className="complain-intro-list">
            {supportHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="complain-intro-stats">
            {supportStats.map((item) => (
              <div key={item.label} className="complain-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="complain-card">
          <div className="complain-header">
            <h3>Complaint Form</h3>
            <p>Provide accurate details so the team can contact you quickly.</p>
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
                <h4>Issue Details</h4>
                <p>Describe the problem, location, and urgency as clearly as possible.</p>
              </div>

              <div className="complain-field">
                <label htmlFor="message">Complaint Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Example: Water leakage in room 204 since last night."
                  rows="6"
                  className="complain-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </section>

            <button type="submit" className="complain-submit">
              Submit Complaint
            </button>

            {message && <p className="complain-success">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
