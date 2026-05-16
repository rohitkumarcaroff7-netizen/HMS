import { Link } from "react-router-dom";
import "./payment-status.css";

const Failed = () => {
  return (
    <div className="payment-status-page payment-status-page-failed">
      <div className="payment-status-shell">
        <div className="payment-status-card">
          <div className="payment-status-icon" aria-hidden="true">
            !
          </div>

          <span className="payment-status-kicker">Payment Update</span>
          <h1>Payment failed</h1>
          <p className="payment-status-message">
            Your room booking could not be completed because the payment did not
            go through.
          </p>

          <div className="payment-status-tips">
            <div className="payment-status-tip">
              Check your payment details and try the booking again.
            </div>
            <div className="payment-status-tip">
              If the amount was deducted, wait a moment and confirm with the hostel office.
            </div>
          </div>

          <div className="payment-status-actions">
            <Link to="/getroom" className="payment-status-btn payment-status-btn-primary">
              Try Again
            </Link>
            <Link to="/" className="payment-status-btn payment-status-btn-secondary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failed;
