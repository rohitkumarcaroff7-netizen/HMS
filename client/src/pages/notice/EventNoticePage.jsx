import React, { useEffect, useMemo, useState } from "react";
import "./eventnotice.css";

const API = "http://localhost:3000/api/events";

const formatEventDate = (value) => {
  if (!value) {
    return "Date to be announced";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const EventNoticePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
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
    };

    fetchEvents();
  }, []);

  const upcomingCount = useMemo(() => events.length, [events]);

  return (
    <div className="event-page">
      <div className="event-shell">
        <section className="event-hero">
          <div className="event-hero-copy">
            <span className="event-kicker">Notice Board</span>
            <h1>Upcoming Events</h1>
            <p>
              Stay updated with hostel activities, important gatherings, and
              campus moments you should not miss.
            </p>
          </div>

          <div className="event-hero-stats">
            <div className="event-stat-card">
              <span>Live Notices</span>
              <strong>{upcomingCount}</strong>
            </div>
            <div className="event-stat-card">
              <span>Status</span>
              <strong>{loading ? "Updating" : "Active"}</strong>
            </div>
          </div>
        </section>

        <section className="event-info-strip">
          Event announcements are managed by the hostel administration and may
          be updated whenever schedules change.
        </section>

        {loading && (
          <p className="event-state-card">Loading the latest event notices...</p>
        )}

        {error && <p className="event-state-card error">{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p className="event-state-card">
            No upcoming events have been posted yet.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <section className="event-grid">
            {events.map((event, index) => (
              <article
                key={event._id || `${event.title}-${index}`}
                className="event-card"
              >
                <div className="event-card-top">
                  <span className="event-card-badge">
                    Event {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="event-card-date">
                    {formatEventDate(event.date)}
                  </span>
                </div>

                <h2>{event.title || "Untitled Event"}</h2>

                <div className="event-meta">
                  <span>{event.location || "Location to be announced"}</span>
                </div>

                <p>
                  {event.description ||
                    "Further event details will be shared by the hostel office."}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default EventNoticePage;
