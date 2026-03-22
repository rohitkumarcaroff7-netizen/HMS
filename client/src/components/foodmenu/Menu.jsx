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
      <div className="bg-blue-200 p-4 text-center text-sm text-gray-600">
        Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-200 p-4 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-blue-200">
      <h1 className="text-lg font-semibold text-center">Hostel Weekly Food Menu</h1>
      <div className="FM grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-100 p-5 w-full max-w-4xl mx-auto rounded-lg">
        {DAYS.map((day) => {
          const meals = menu[day] || {};

          return (
            <div key={day} className="FMC bg-blue-50 hover:scale-[1.02] transition">
              <h2 className="text-sm font-semibold text-blue-900">{day}</h2>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {meals.breakfast || "-"}
                </li>
                <li>
                  <span className="font-medium">Lunch:</span> {meals.lunch || "-"}
                </li>
                <li>
                  <span className="font-medium">Dinner:</span>{" "}
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
