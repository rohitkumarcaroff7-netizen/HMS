import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./getcomplain.css";

const GetSupport = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();

  const getSupport = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/getSupport", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getSupport();
  }, [getSupport]);

  const removeMessage = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/deleteSupport/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      getSupport();
      alert("Support message removed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-page">
      <div className="userdetails support-shell">
        <div className="user-header">
          <div>
            <h1 className="dhead">Support</h1>
            <p className="user-sub">Review contact form submissions in one place.</p>
          </div>
          <div className="user-count">{messages.length} messages</div>
        </div>

        <div className="support-list">
          {messages.length === 0 ? (
            <div className="support-empty">No support messages have been submitted yet.</div>
          ) : (
            messages.map((item, index) => (
              <div key={item._id} className="support-card">
                <div className="support-card-top">
                  <div className="support-avatar" aria-hidden="true">
                    {item.name?.trim()?.charAt(0)?.toUpperCase() || "S"}
                  </div>

                  <div className="support-identity">
                    <div className="support-title-row">
                      <h2>{item.name || "Unknown User"}</h2>
                      <span className="support-seq">#{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <a href={`mailto:${item.email}`} className="support-email">
                      {item.email || "No email provided"}
                    </a>
                  </div>
                </div>

                <div className="support-message">
                  <span>Message</span>
                  <p>{item.message || "No message provided."}</p>
                </div>

                <div className="support-actions">
                  <button
                    className="delbtn support-delete"
                    onClick={() => removeMessage(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GetSupport;
