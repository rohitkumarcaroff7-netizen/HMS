import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import "./foodnoticeadmin.css";

const API = "http://localhost:3000/api/foodnotice";

const FoodNoticeAdmin = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState("Food Notice");
  const [noticeText, setNoticeText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchNotice = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load food notice.");
      }

      setTitle(data?.title || "Food Notice");
      setNoticeText(Array.isArray(data?.notices) ? data.notices.join("\n") : "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const notices = noticeText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim() || "Food Notice",
          notices,
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save food notice.");
      }

      setTitle(data.title || "Food Notice");
      setNoticeText(Array.isArray(data.notices) ? data.notices.join("\n") : "");
      toast.success("Food notice updated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fna-page">
      <div className="fna-shell">
        <div className="fna-header">
          <div>
            <h1>Food Notice</h1>
            <p>Manage the food notice content shown on the notice page.</p>
          </div>
        </div>

        {error && <div className="fna-error">{error}</div>}

        {loading ? (
          <div className="fna-loading">Loading food notice...</div>
        ) : (
          <form className="fna-form" onSubmit={handleSave}>
            <div className="fna-field">
              <label htmlFor="food-notice-title">Heading</label>
              <input
                id="food-notice-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="fna-input"
                placeholder="Food Notice"
              />
            </div>

            <div className="fna-field">
              <label htmlFor="food-notice-list">Notice Items</label>
              <textarea
                id="food-notice-list"
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                className="fna-textarea"
                rows={7}
                placeholder={"Enter one notice per line.\nExample: Sunday meal changed to Dosa and Chutney"}
              />
              <p className="fna-help">Each line will appear as a separate notice item.</p>
            </div>

            <button type="submit" className="fna-submit" disabled={saving}>
              {saving ? "Saving..." : "Save Food Notice"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FoodNoticeAdmin;
