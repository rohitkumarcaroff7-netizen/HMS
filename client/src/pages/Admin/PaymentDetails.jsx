import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./paymentdetails.css";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
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

  return (
    <div className="payment-page">
      <div className="payment-shell">
        <div className="payment-header">
          <div>
            <h1>Payment Details</h1>
            <p>Booked rooms and student payment records.</p>
          </div>
          <div className="payment-count">{payments.length} records</div>
        </div>

        {payments.length === 0 ? (
          <div className="payment-empty">No payment records yet.</div>
        ) : (
          <div className="payment-list">
            {payments.map((item) => {
              const student = item.stu_id || {};
              return (
                <div key={item._id} className="payment-card">
                  <div className="payment-card-header">
                    <div>
                      <h2>Room {item.room_no}</h2>
                      <p>Price: {item.price} INR</p>
                    </div>
                    <span className="payment-status">Paid</span>
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
