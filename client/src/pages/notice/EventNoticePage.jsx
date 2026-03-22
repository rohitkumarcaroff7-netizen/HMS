import React, { useEffect, useState } from "react";
import "./eventnotice.css";

const API = "http://localhost:3000/api/events";

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

  return (
    <div className="event-page h-[670px] bg-white flex justify-center bg-gradient-to-r from-blue-50 to-blue-200">
      <div className="event-container w-365">
        <h1 className="evthead text-xl font-bold text-center text-black">
          Upcoming Events
        </h1>
        <br />

        {loading && (
          <p className="text-center text-gray-500 text-sm">Loading events...</p>
        )}
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No upcoming events at this time.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event._id}
              className="evcard bg-amber-300 h-30 flex justify-center items-center flex-col shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {event.date} | {event.location}
              </p>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventNoticePage;
