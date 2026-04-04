import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./paymentdetails.css";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { token } = useAuth();

  const getPayments = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/getPayments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  const filteredPayments = payments.filter((item) => {
    if (selectedCategory === "Paid") {
      return item.paymentStatus === "Paid";
    }

    if (selectedCategory === "Unpaid") {
      return item.paymentStatus === "Unpaid";
    }

    if (selectedCategory === "Booked") {
      return item.room_no !== null && item.room_no !== undefined;
    }

    return true;
  });

  return (
    <div className="payment-page">
      <div className="payment-shell">
        <div className="payment-header">
          <div>
            <h1>Payment Details</h1>
            <p>Booked rooms and student payment records.</p>
          </div>
          <div className="payment-count">{filteredPayments.length} records</div>
        </div>

        <div className="payment-filters">
          <button
            className={`payment-filter-btn ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          <button
            className={`payment-filter-btn ${selectedCategory === "Paid" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Paid")}
          >
            Paid Users
          </button>
          <button
            className={`payment-filter-btn ${selectedCategory === "Unpaid" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Unpaid")}
          >
            Unpaid Users
          </button>
          <button
            className={`payment-filter-btn ${selectedCategory === "Booked" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Booked")}
          >
            Booked Room Details
          </button>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="payment-empty">
            {selectedCategory === "All"
              ? "No payment records yet."
              : selectedCategory === "Booked"
                ? "No booked room details found."
                : `No ${selectedCategory.toLowerCase()} users found.`}
          </div>
        ) : (
          <div className="payment-list">
            {filteredPayments.map((item) => {
              const student = item.stu_id || {};
              const isPaid = item.paymentStatus === "Paid";
              return (
                <div key={item._id} className="payment-card">
                  <div className="payment-card-header">
                    <div>
                      <h2 className="payment-room-title">
                        {isPaid ? (
                          <>
                            <span className="payment-room-label">Room</span>
                            <span className="payment-room-number">{item.room_no}</span>
                          </>
                        ) : (
                          "Room not assigned"
                        )}
                      </h2>
                      <p>{isPaid ? `Price: ${item.price} INR` : "Price: Not paid yet"}</p>
                    </div>
                    <span className={`payment-status ${isPaid ? "paid" : "unpaid"}`}>
                      {item.paymentStatus}
                    </span>
                  </div>
                  <div className="payment-details">
                    <div>
                      <span>Student</span>
                      <strong>{student.username || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Email</span>
                      <strong>{student.email || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Regd No</span>
                      <strong>{student.regd_no || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Course</span>
                      <strong>{student.course || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Year</span>
                      <strong>{student.st_yr || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Phone</span>
                      <strong>{student.phone || "N/A"}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
