import React, { useState } from "react";

import "./complain.css";

export const ComplaintForm = () => {
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
          <h2>Tell Us Your Issue</h2>
          <p>
            Share the details of your complaint so the hostel team can review and respond
            quickly. Please include accurate contact info.
          </p>
          <ul>
            <li>Response within 24-48 hours</li>
            <li>Trackable complaint record</li>
            <li>Priority for urgent issues</li>
          </ul>
        </div>

        <div className="complain-card">
          <div className="complain-header">
            <h3>Complaint Form</h3>
            <p>All fields are required.</p>
          </div>
          <form onSubmit={handleSubmit} className="complain-form">
            <div>
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="complain-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone_no">Phone number</label>
              <input
                type="number"
                id="phone_no"
                name="phone_no"
                placeholder="Phone number"
                className="complain-input"
                value={formData.phone_no}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="message">Complaint details</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                rows="5"
                className="complain-textarea"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="complain-submit">
              Submit Complaint
            </button>
          </form>
        </div>

        {message && (
          <p className="complain-success">{message}</p>
        )}
      </div>
    </div>
  );
};
