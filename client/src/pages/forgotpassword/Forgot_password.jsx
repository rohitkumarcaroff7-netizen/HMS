import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot_password.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOTPfield, setShowOTPfield] = useState(false);
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const step = !showOTPfield ? 1 : !verified ? 2 : 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setShowOTPfield(true);
        setResendCooldown(60);
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Try again.");
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setResendCooldown(60);
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Try again.");
      console.error(error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setToken(data.token);
        setVerified(true);
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Invalid OTP.");
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return alert("Passwords must match.");
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        console.log("Password reset successfully.");
        alert("Password reset Successfull.")
        navigate("/signin");
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Error resetting password.");
      console.error(error);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-grid">
        <div className="forgot-hero">
          <span className="forgot-badge">Account Recovery</span>
          <h1>
            Reset your IMIT Hostel <br /> Management access
          </h1>
          <p>
            Follow the quick verification steps to regain access to your hostel
            profile and notices.
          </p>
          <ul>
            <li>Verify your registered email</li>
            <li>Secure one-time OTP validation</li>
            <li>Create a fresh, safe password</li>
          </ul>
        </div>

        <div className="forgot-card">
          <div className="forgot-header">
            <h2>Forgot Password</h2>
            <p>
              {step === 1 &&
                "Enter your email to receive a one-time verification code."}
              {step === 2 && "Check your inbox and enter the OTP to continue."}
              {step === 3 && "Create a new password to secure your account."}
            </p>
          </div>

          <div className="forgot-steps">
            <span className={step >= 1 ? "is-active" : ""}>Email</span>
            <span className={step >= 2 ? "is-active" : ""}>OTP</span>
            <span className={step >= 3 ? "is-active" : ""}>Reset</span>
          </div>

          {error && <div className="forgot-error">{error}</div>}

          {!showOTPfield ? (
            <form onSubmit={handleSubmit} className="forgot-form">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc@example.com"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="forgot-input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`forgot-submit ${loading ? "is-loading" : ""}`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
              <p className="forgot-helper">
                Remembered it?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="forgot-link"
                >
                  Back to sign in
                </button>
              </p>
            </form>
          ) : !verified ? (
            <form onSubmit={handleVerifyOTP} className="forgot-form">
              <div>
                <label htmlFor="email-locked">Email Address</label>
                <input
                  type="email"
                  id="email-locked"
                  value={email}
                  disabled
                  className="forgot-input is-disabled"
                />
              </div>
              <div>
                <label htmlFor="otp">One-time Password</label>
                <input
                  type="text"
                  id="otp"
                  placeholder="6-digit code"
                  required
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="forgot-input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`forgot-submit ${loading ? "is-loading" : ""}`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading || resendCooldown > 0}
                className={`forgot-secondary ${
                  loading || resendCooldown > 0 ? "is-disabled" : ""
                }`}
              >
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : "Resend OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="forgot-form">
              <div>
                <label htmlFor="email-final">Email Address</label>
                <input
                  type="email"
                  id="email-final"
                  value={email}
                  disabled
                  className="forgot-input is-disabled"
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Create a strong password"
                  required
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="forgot-input"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="forgot-input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`forgot-submit ${loading ? "is-loading" : ""}`}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
