import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./getcomplain.css"


const GetContact = () => {
  const [user, setUser] = useState([]);
  const { token } = useAuth();
  const getContact = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/getContact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const removeUser = async(id)=>{
    try {
        const res = await fetch(`http://localhost:3000/api/admin/deleteComplain/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        getContact()
        alert("Complain Removed");
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getContact();
  }, [getContact]);
  return (
    <div className="user-page">
      <div className="userdetails complaint-shell">
        <div className="user-header">
          <div>
            <h1 className="dhead">Complaints</h1>
            <p className="user-sub">Review and resolve student issues in a single queue.</p>
          </div>
          <div className="user-count">{user.length} complaints</div>
        </div>

        <div className="complaint-list">
          {user.length === 0 ? (
            <div className="complaint-empty">
              No complaints have been submitted yet.
            </div>
          ) : (
            user.map((item, index) => (
              <div key={item._id || index} className="complaint-row">
                <div className="complaint-index">
                  <span>#{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="complaint-main">
                  <div className="complaint-top">
                    <div className="complaint-user">
                      <h2>{item.name}</h2>
                      <p>{item.phone_no || "Phone not provided"}</p>
                    </div>
                  </div>

                  <div className="complaint-message">
                    <span>Complaint Message</span>
                    <p>{item.message || "No message provided."}</p>
                  </div>
                </div>

                <div className="complaint-actions">
                  <button
                    className="delbtn complaint-delete"
                    onClick={() => removeUser(item._id)}
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

export default GetContact;
