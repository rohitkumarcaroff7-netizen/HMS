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
      <div className="userdetails">
        <div className="user-header">
          <div>
            <h1 className="dhead">Support</h1>
            <p className="user-sub">Contact form submissions.</p>
          </div>
          <div className="user-count">{messages.length} messages</div>
        </div>

        <div className="user-list">
          {messages.map((item) => (
            <div key={item._id} className="detailcard user-card">
              <div className="user-card-body">
                <h2>{item.name}</h2>
                <p>Email: {item.email}</p>
                <p>Message: {item.message}</p>
              </div>
              <button className="delbtn" onClick={() => removeMessage(item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetSupport;
