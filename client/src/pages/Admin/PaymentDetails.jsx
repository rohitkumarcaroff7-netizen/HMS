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

  const paidCount = payments.filter((item) => item.paymentStatus === "Paid").length;
  const unpaidCount = payments.filter((item) => item.paymentStatus === "Unpaid").length;
  const bookedCount = payments.filter(
    (item) => item.room_no !== null && item.room_no !== undefined
  ).length;

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

  const formatAmount = (amount, isPaid) => {
    if (!isPaid || amount === null || amount === undefined) {
      return "Pending";
    }

    return `${amount} INR`;
  };

  return (
    <div className="payment-page">
      <div className="payment-shell">
        <div className="payment-header">
          <div>
            <h1>Payment Details</h1>
            <p>Track room assignments, payment status, and student records.</p>
          </div>
          <div className="payment-count">{filteredPayments.length} records</div>
        </div>

        <div className="payment-overview">
          <div className="payment-overview-card">
            <span>Total Records</span>
            <strong>{payments.length}</strong>
          </div>
          <div className="payment-overview-card paid">
            <span>Paid Users</span>
            <strong>{paidCount}</strong>
          </div>
          <div className="payment-overview-card unpaid">
            <span>Unpaid Users</span>
            <strong>{unpaidCount}</strong>
          </div>
          <div className="payment-overview-card booked">
            <span>Booked Rooms</span>
            <strong>{bookedCount}</strong>
          </div>
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
            <div className="payment-list-header">
              <span>Profile Pic</span>
              <span>Name</span>
              <span>Gmail</span>
              <span>Room Number</span>
              <span>Registration Number</span>
              <span>Course</span>
              <span>Year</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {filteredPayments.map((item) => {
              const student = item.stu_id || {};
              const isPaid = item.paymentStatus === "Paid";
              const imageSrc = student.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

              return (
                <div key={item._id} className="payment-row">
                  <div className="payment-row-item payment-profile-cell" data-label="Profile Pic">
                    <img
                      src={imageSrc}
                      alt={student.username || "Student"}
                      className="payment-profile-pic"
                    />
                  </div>
                  <div className="payment-row-item" data-label="Name">
                    {student.username || "N/A"}
                  </div>
                  <div className="payment-row-item" data-label="Gmail">
                    {student.email || "N/A"}
                  </div>
                  <div className="payment-row-item" data-label="Room Number">
                    {item.room_no ?? "N/A"}
                  </div>
                  <div className="payment-row-item" data-label="Registration Number">
                    {student.regd_no || "N/A"}
                  </div>
                  <div className="payment-row-item" data-label="Course">
                    {student.course || "N/A"}
                  </div>
                  <div className="payment-row-item" data-label="Year">
                    {student.st_yr || "N/A"}
                  </div>
                  <div className="payment-row-item" data-label="Amount">
                    {formatAmount(item.price, isPaid)}
                  </div>
                  <div className="payment-row-item" data-label="Status">
                    <span className={`payment-status ${isPaid ? "paid" : "unpaid"}`}>
                      {item.paymentStatus || "Unknown"}
                    </span>
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
