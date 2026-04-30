import "./notice.css";
import React, { useEffect, useState } from "react";
import HostelMenu from "../../components/foodmenu/Menu";

const API = "http://localhost:3000/api/foodnotice";

export const Notice = () => {
  const [title, setTitle] = useState("Food Notice");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          return;
        }

        setTitle(data?.title || "Food Notice");
        setNotices(Array.isArray(data?.notices) ? data.notices : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotice();
  }, []);

  return (
    <div className="food-notice-page">
      <div className="food-notice-shell">
        <section className="food-notice-hero">
          <div className="food-notice-copy">
            <span className="food-notice-badge">Dining Updates</span>
            <h1>{title}</h1>
            <p>
              Stay updated with hostel mess announcements and the weekly meal
              plan in one place.
            </p>
          </div>

          <div className="food-notice-highlight">
            <span className="food-highlight-label">Today&apos;s Board</span>
            <strong>{notices.length}</strong>
            <p>
              {notices.length === 0
                ? "No active updates right now."
                : "Important food-related notice" +
                  (notices.length > 1 ? "s are" : " is") +
                  " active."}
            </p>
          </div>
        </section>

        <section className="food-notice-layout">
          <div className="food-notice-panel">
            <div className="food-panel-header">
              <span className="food-panel-kicker">Notice Board</span>
              <h2>Mess Announcements</h2>
              <p>
                Quick updates for students regarding meals, timing changes, or
                service availability.
              </p>
            </div>

            {notices.length === 0 ? (
              <div className="food-empty-state">
                No food notices available right now.
              </div>
            ) : (
              <ul className="food-notice-list">
                {notices.map((item, index) => (
                  <li key={`${item}-${index}`} className="food-notice-item">
                    <span className="food-notice-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="food-menu-panel">
            <div className="food-panel-header">
              <span className="food-panel-kicker">Weekly Menu</span>
              <h2>Meal Schedule</h2>
              <p>
                A day-by-day view of breakfast, lunch, and dinner for the hostel.
              </p>
            </div>
            <HostelMenu />
          </div>
        </section>
      </div>
    </div>
  );
};
