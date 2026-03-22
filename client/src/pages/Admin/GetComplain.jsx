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
      <div className="userdetails">
        <div className="user-header">
          <div>
            <h1 className="dhead">Complaints</h1>
            <p className="user-sub">Review and resolve student issues.</p>
          </div>
          <div className="user-count">{user.length} complaints</div>
        </div>

        <div className="user-list">
          {user.map((item, index) => (
            <div key={index} className="detailcard user-card">
              <div className="user-card-body">
                <h2>{item.name}</h2>
                <p>Phone Number: {item.phone_no}</p>
                <p>Message: {item.message}</p>
              </div>
              <button
                className="delbtn"
                onClick={() => removeUser(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetContact;
