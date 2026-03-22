import React, { useCallback, useEffect, useState } from "react";
import "./room.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [hasBooked, setHasBooked] = useState(false);
  const [bookedRoomId, setBookedRoomId] = useState(null);
  const { userId, isLoggedIn, role, token } = useAuth();
  const navigate = useNavigate();

  const getRooms = useCallback(async () => {
    try {
      const endpoint =
        isLoggedIn && role !== "admin"
          ? "http://localhost:3000/api/payment/student/rooms"
          : "http://localhost:3000/api/room/getRoom";

      const res = await fetch(endpoint, {
        method: "GET",
        headers:
          isLoggedIn && role !== "admin"
            ? { Authorization: `Bearer ${token}` }
            : {},
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch rooms.");
      }

      if (isLoggedIn && role !== "admin") {
        setRooms(Array.isArray(data.rooms) ? data.rooms : []);
        setHasBooked(Boolean(data.hasBooked));
        setBookedRoomId(data.bookedRoomId || null);
        return;
      }

      setRooms(Array.isArray(data) ? data : []);
      setHasBooked(false);
      setBookedRoomId(null);
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn, role, token]);

  const makePayment = async (id) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/payment/checkout/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId: id, userId: userId }),
        }
      );
      console.log(res);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  const isBookingDisabled = role === "admin" || hasBooked;

  return (
    <div className="room-page">
      <div className="room-shell">
        <div className="room-header">
          <div>
            <h1>Choose Your Room</h1>
            <p>Pick an available room and proceed to payment.</p>
            {role === "admin" && (
              <div className="room-alert">Admin can't book.</div>
            )}
            {hasBooked && role !== "admin" && (
              <div className="room-alert">You have already booked a room.</div>
            )}
          </div>
          <div className="room-count">{rooms.length} rooms</div>
        </div>

        <div className="room-grid">
          {rooms.map((item, index) => (
            <div className="room-card" key={index}>
              <div className="room-card-body">
                <h2>Room {item.room_no}</h2>
                <p>Price: {item.price} INR</p>
              </div>
              <button
                className={`purchasebtn ${isBookingDisabled ? "is-disabled" : ""}`}
                disabled={isBookingDisabled}
                onClick={() => {
                  if (isBookingDisabled) return;
                  isLoggedIn ? makePayment(item._id) : navigate("/login");
                }}
              >
                {role === "admin"
                  ? "Admin can't book."
                  : hasBooked && bookedRoomId === item._id
                    ? "Already Booked"
                    : hasBooked
                      ? "Already Booked"
                      : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
