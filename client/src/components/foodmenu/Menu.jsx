import { useEffect, useState } from "react";
import "./menu.css";

const API = "http://localhost:3000/api/foodmenu";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HostelMenu() {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load menu.");
        }

        setMenu(data?.items || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="hostel-menu-feedback">
        Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="hostel-menu-feedback hostel-menu-error">
        {error}
      </div>
    );
  }

  return (
    <div className="hostel-menu">
      <h1 className="hostel-menu-title">Hostel Weekly Food Menu</h1>
      <div className="hostel-menu-grid">
        {DAYS.map((day) => {
          const meals = menu[day] || {};

          return (
            <div key={day} className="hostel-menu-card">
              <h2>{day}</h2>
              <ul className="hostel-menu-meals">
                <li>
                  <span>Breakfast:</span>{" "}
                  {meals.breakfast || "-"}
                </li>
                <li>
                  <span>Lunch:</span> {meals.lunch || "-"}
                </li>
                <li>
                  <span>Dinner:</span>{" "}
                  {meals.dinner || "-"}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
