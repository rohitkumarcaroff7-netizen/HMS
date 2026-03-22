import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./eventsadmin.css";

const API = "http://localhost:3000/api/events";

const EventsAdmin = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load events.");
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location || !form.description) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create event.");
      }

      setEvents((prev) => [data, ...prev]);
      setForm({ title: "", date: "", location: "", description: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    setError("");

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete event.");
      }

      setEvents((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="events-admin-page">
      <div className="events-admin-shell">
        <div className="events-admin-header">
          <div>
            <h1>Events</h1>
            <p>Create and manage event notices for the hostel.</p>
          </div>
          <div className="events-admin-count">{events.length} events</div>
        </div>

        {error && <div className="events-error">{error}</div>}

        <div className="events-admin-grid">
          <form className="events-admin-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Event Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Hostel Annual Sports"
                className="events-input"
              />
            </div>
            <div className="events-row">
              <div>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="e.g. May 12, 2026"
                  className="events-input"
                />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Main Ground"
                  className="events-input"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short description for the notice."
                className="events-textarea"
                rows={4}
              />
            </div>
            <button type="submit" className="events-submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Event"}
            </button>
          </form>

          <div className="events-admin-list">
            {loading ? (
              <div className="events-empty">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="events-empty">No events added yet.</div>
            ) : (
              events.map((item) => (
                <div key={item._id} className="events-card">
                  <div>
                    <h2>{item.title}</h2>
                    <p className="events-meta">
                      {item.date} | {item.location}
                    </p>
                    <p className="events-desc">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    className="events-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAdmin;
