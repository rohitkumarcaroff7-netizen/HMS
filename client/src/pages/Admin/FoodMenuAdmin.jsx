import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./foodmenuadmin.css";

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
const MEALS = ["breakfast", "lunch", "dinner"];

const emptyMenu = () =>
  Object.fromEntries(
    DAYS.map((day) => [day, { breakfast: "", lunch: "", dinner: "" }])
  );

const FoodMenuAdmin = () => {
  const { token } = useAuth();
  const [items, setItems] = useState(emptyMenu());
  const [activeDay, setActiveDay] = useState("Monday");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load menu.");
      }

      const merged = emptyMenu();
      DAYS.forEach((day) => {
        if (data?.items?.[day]) {
          merged[day] = { ...merged[day], ...data.items[day] };
        }
      });
      setItems(merged);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleChange = (day, meal, value) => {
    setItems((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save menu.");
      }

      toast.success("Menu saved successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fma-page">
      <div className="fma-shell">
        <div className="fma-header">
          <div>
            <h1>Food Menu</h1>
            <p>Edit the weekly breakfast, lunch, and dinner schedule.</p>
          </div>
          <button className="fma-save-btn" onClick={handleSave} disabled={saving || loading}>
            {saving ? "Saving..." : "Save Menu"}
          </button>
        </div>

        {error && <div className="fma-error">{error}</div>}

        {loading ? (
          <div className="fma-loading">Loading menu...</div>
        ) : (
          <div className="fma-body">
            <div className="fma-tabs">
              {DAYS.map((day) => (
                <button
                  key={day}
                  className={`fma-tab ${activeDay === day ? "fma-tab--active" : ""}`}
                  onClick={() => setActiveDay(day)}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            <div className="fma-form-card">
              <h2 className="fma-day-title">{activeDay}</h2>
              <div className="fma-meal-grid">
                {MEALS.map((meal) => (
                  <div key={meal} className="fma-meal-field">
                    <label htmlFor={`${activeDay}-${meal}`}>
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </label>
                    <input
                      id={`${activeDay}-${meal}`}
                      type="text"
                      value={items[activeDay]?.[meal] || ""}
                      onChange={(e) => handleChange(activeDay, meal, e.target.value)}
                      placeholder="e.g. Idli & Sambar"
                      className="fma-input"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="fma-preview">
              <h3>All Days Preview</h3>
              <div className="fma-preview-grid">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className={`fma-preview-card ${activeDay === day ? "fma-preview-card--active" : ""}`}
                    onClick={() => setActiveDay(day)}
                  >
                    <span className="fma-preview-day">{day.slice(0, 3)}</span>
                    <ul>
                      {MEALS.map((meal) => (
                        <li key={meal}>
                          <span>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</span>{" "}
                          {items[day]?.[meal] || <em className="fma-empty-meal">not set</em>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenuAdmin;
