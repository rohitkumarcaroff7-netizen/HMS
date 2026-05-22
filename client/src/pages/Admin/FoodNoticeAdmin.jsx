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

  const noticeLines = noticeText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="fna-page">
      <div className="fna-shell">
        <div className="fna-header">
          <div className="fna-header-copy">
            <span className="fna-eyebrow">Notice Publisher</span>
            <h1>Food Notice Management</h1>
            <p>
              Update the food notice heading and publish day-to-day meal related
              updates for students in one place.
            </p>
          </div>

          <div className="fna-status-card">
            <span className="fna-status-label">Live Summary</span>
            <strong>{noticeLines.length}</strong>
            <p>notice items ready to publish</p>
          </div>
        </div>

        {error && <div className="fna-error">{error}</div>}

        {loading ? (
          <div className="fna-loading">Loading food notice...</div>
        ) : (
          <form className="fna-form" onSubmit={handleSave}>
            <div className="fna-main-card">
              <div className="fna-field-card">
                <div className="fna-field-head">
                  <label htmlFor="food-notice-title">Heading</label>
                  <span className="fna-field-tag">Display title</span>
                </div>
                <input
                  id="food-notice-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="fna-input"
                  placeholder="Food Notice"
                />
              </div>

              <div className="fna-field-card">
                <div className="fna-field-head">
                  <label htmlFor="food-notice-list">Notice Items</label>
                  <span className="fna-field-tag">One per line</span>
                </div>
                <textarea
                  id="food-notice-list"
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  className="fna-textarea"
                  rows={8}
                  placeholder={
                    "Enter one notice per line.\nExample: Sunday meal changed to Dosa and Chutney"
                  }
                />
                <p className="fna-help">
                  Each line will appear as a separate notice item on the notice
                  page.
                </p>
              </div>
            </div>

            <aside className="fna-side-card">
              <div className="fna-side-block">
                <span className="fna-side-label">Quick Tips</span>
                <ul className="fna-tip-list">
                  <li>Keep each update short so students can scan it quickly.</li>
                  <li>Use one line per notice to keep the frontend list clean.</li>
                  <li>Update the title only when the notice type changes.</li>
                </ul>
              </div>

              <div className="fna-side-block">
                <span className="fna-side-label">Preview Count</span>
                <div className="fna-count-pill">
                  <strong>{noticeLines.length}</strong>
                  <span>items prepared</span>
                </div>
              </div>

              <button type="submit" className="fna-submit" disabled={saving}>
                {saving ? "Saving..." : "Save Food Notice"}
              </button>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
};

export default FoodNoticeAdmin;
