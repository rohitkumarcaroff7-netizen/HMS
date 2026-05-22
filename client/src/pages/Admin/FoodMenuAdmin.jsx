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
const MEAL_META = {
  breakfast: {
    label: "Breakfast",
    hint: "Set the first meal students see at the start of the day.",
    placeholder: "e.g. Idli & Sambar",
  },
  lunch: {
    label: "Lunch",
    hint: "Add the main midday meal served in the hostel.",
    placeholder: "e.g. Rice, Dal & Veg Curry",
  },
  dinner: {
    label: "Dinner",
    hint: "Finish the day with the evening meal plan.",
    placeholder: "e.g. Roti, Paneer Masala",
  },
};

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

  const completedMeals = DAYS.reduce(
    (count, day) =>
      count + MEALS.filter((meal) => items[day]?.[meal]?.trim()).length,
    0
  );
  const totalMeals = DAYS.length * MEALS.length;
  const activeDayFilled = MEALS.filter(
    (meal) => items[activeDay]?.[meal]?.trim()
  ).length;

  return (
    <div className="fma-page">
      <div className="fma-shell">
        <div className="fma-header">
          <div className="fma-header-copy">
            <span className="fma-eyebrow">Weekly Kitchen Planner</span>
            <h1>Food Menu Management</h1>
            <p>
              Manage breakfast, lunch, and dinner for the full week with a
              cleaner day-by-day editing flow.
            </p>
          </div>

          <div className="fma-header-actions">
            <div className="fma-status-card">
              <span className="fma-status-label">Menu Coverage</span>
              <strong>
                {completedMeals}/{totalMeals}
              </strong>
              <p>{activeDayFilled} meals set for {activeDay}</p>
            </div>

            <button
              className="fma-save-btn"
              onClick={handleSave}
              disabled={saving || loading}
            >
              {saving ? "Saving..." : "Save Menu"}
            </button>
          </div>
        </div>

        {error && <div className="fma-error">{error}</div>}

        {loading ? (
          <div className="fma-loading">Loading menu...</div>
        ) : (
          <div className="fma-body">
            <div className="fma-topbar">
              <div className="fma-tabs" role="tablist" aria-label="Select day">
                {DAYS.map((day) => {
                  const filledCount = MEALS.filter((meal) =>
                    items[day]?.[meal]?.trim()
                  ).length;

                  return (
                    <button
                      key={day}
                      className={`fma-tab ${
                        activeDay === day ? "fma-tab--active" : ""
                      }`}
                      onClick={() => setActiveDay(day)}
                      role="tab"
                      aria-selected={activeDay === day}
                    >
                      <span className="fma-tab-day">{day}</span>
                      <span className="fma-tab-meta">{filledCount}/3 meals</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="fma-layout">
              <div className="fma-form-card">
                <div className="fma-form-head">
                  <div>
                    <span className="fma-section-label">Editing Day</span>
                    <h2 className="fma-day-title">{activeDay}</h2>
                  </div>

                  <div className="fma-day-progress">
                    <span>{activeDayFilled} of 3 meals ready</span>
                  </div>
                </div>

                <div className="fma-meal-grid">
                  {MEALS.map((meal) => (
                    <div key={meal} className="fma-meal-field">
                      <label htmlFor={`${activeDay}-${meal}`}>
                        {MEAL_META[meal].label}
                      </label>
                      <p className="fma-meal-hint">{MEAL_META[meal].hint}</p>
                      <input
                        id={`${activeDay}-${meal}`}
                        type="text"
                        value={items[activeDay]?.[meal] || ""}
                        onChange={(e) =>
                          handleChange(activeDay, meal, e.target.value)
                        }
                        placeholder={MEAL_META[meal].placeholder}
                        className="fma-input"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="fma-preview">
                <div className="fma-preview-head">
                  <div>
                    <span className="fma-section-label">Weekly Snapshot</span>
                    <h3>All Days Preview</h3>
                  </div>
                  <p>Click any day card to jump back into editing.</p>
                </div>

                <div className="fma-preview-grid">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className={`fma-preview-card ${
                        activeDay === day ? "fma-preview-card--active" : ""
                      }`}
                      onClick={() => setActiveDay(day)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          setActiveDay(day);
                        }
                      }}
                    >
                      <div className="fma-preview-top">
                        <span className="fma-preview-day">{day}</span>
                        <span className="fma-preview-count">
                          {
                            MEALS.filter((meal) =>
                              items[day]?.[meal]?.trim()
                            ).length
                          }
                          /3
                        </span>
                      </div>

                      <ul>
                        {MEALS.map((meal) => (
                          <li key={meal}>
                            <span>{MEAL_META[meal].label}</span>
                            <strong>
                              {items[day]?.[meal] || (
                                <em className="fma-empty-meal">Not set</em>
                              )}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenuAdmin;
