import React, { useCallback, useEffect, useState } from "react";
import "./room.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [hasBooked, setHasBooked] = useState(false);
  const [bookedRoomId, setBookedRoomId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, isLoggedIn, role, token } = useAuth();
  const navigate = useNavigate();

  const getRooms = useCallback(async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
  const availableRooms = rooms.length;
  const bookingStatusLabel =
    role === "admin"
      ? "Admin accounts can review rooms but cannot reserve them."
      : hasBooked
        ? "Your room is already secured. Additional bookings are disabled."
        : isLoggedIn
          ? "Select any available room and continue to secure payment."
          : "Sign in to continue from room selection to payment.";

  return (
    <div className="room-page">
      <div className="room-shell">
        <div className="room-hero">
          <div className="room-header">
            <div className="room-header-copy">
              <span className="room-kicker">Hostel Accommodation</span>
              <h1>Choose a room that fits your stay</h1>
              <p>{bookingStatusLabel}</p>
              {role === "admin" && (
                <div className="room-alert">Admin accounts cannot book rooms.</div>
              )}
              {hasBooked && role !== "admin" && (
                <div className="room-alert">You have already booked a room.</div>
              )}
            </div>
            <div className="room-count">{availableRooms} rooms available</div>
          </div>

          <div className="room-highlights">
            <div className="room-highlight-card">
              <span>Total Listed</span>
              <strong>{availableRooms}</strong>
              <p>Freshly loaded from the current room inventory.</p>
            </div>
            <div className="room-highlight-card">
              <span>Booking Access</span>
              <strong>{isLoggedIn ? "Enabled" : "Login Required"}</strong>
              <p>{isLoggedIn ? "You can continue to payment from any card." : "Sign in before you confirm a room."}</p>
            </div>
            <div className="room-highlight-card">
              <span>Checkout</span>
              <strong>Secure Payment</strong>
              <p>Room confirmation continues through the payment gateway.</p>
            </div>
          </div>
        </div>

        <div className="room-grid">
          {isLoading ? (
            <div className="room-empty-state">
              <h2>Loading rooms...</h2>
              <p>Please wait while we prepare the latest availability for you.</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="room-empty-state">
              <h2>No rooms available right now</h2>
              <p>Please check back later or contact the hostel office for help with availability.</p>
            </div>
          ) : (
            rooms.map((item) => (
              <div className="room-card" key={item._id}>
                <div className="room-card-body">
                  <h2>Room {item.room_no}</h2>
                </div>

                <div className="room-meta">
                  <div>
                    <span className="room-meta-label">Price</span>
                    <strong>INR {item.price}</strong>
                  </div>
                  <div>
                    <span className="room-meta-label">Status</span>
                    <strong>{hasBooked && bookedRoomId === item._id ? "Booked by you" : "Open"}</strong>
                  </div>
                  <div>
                    <span className="room-meta-label">Availability</span>
                    <strong>Available</strong>
                  </div>
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
                    ? "Admin can't book"
                    : hasBooked && bookedRoomId === item._id
                      ? "Already Booked"
                      : hasBooked
                        ? "Booking Locked"
                        : isLoggedIn
                          ? "Book This Room"
                          : "Login to Book"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
