import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { storeTokenInLS } = useAuth();
  const loginHighlights = [
    "Access your hostel profile and room details",
    "Track service requests and important updates",
    "Stay connected with notices from the administration",
  ];
  const loginStats = [
    { value: "Secure", label: "Protected student login access" },
    { value: "Fast", label: "Quick access to key hostel services" },
    { value: "Central", label: "One dashboard for hostel activity" },
  ];
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkInput = () => {
    const { email, password } = user;
    if (!email || !password) {
      console.error("All fields are required.");
      return false;
    }
    if (password.length < 4) {
      console.error("Password must be at least 4 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();
        storeTokenInLS(data.token, data.userExist.role, data.userExist._id);
        console.log(data.userExist.role);
        console.log(data);
        setIsLoading(false);
        console.log("Login successful");
        alert("Login successful");
        navigate("/");
      } else {
        setIsLoading(false);
        console.error("Invalid credentials.");
        alert("Invalid Credential.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("Login failed. Check server connection/CORS and try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-grid">
        <div className="login-hero">
          <span className="login-badge">Student Access</span>
          <h1>Welcome Back to IMIT Hostel Management System</h1>
          <p>
            Sign in to manage your hostel profile, check room and request status,
            and stay updated with important hostel notices.
          </p>
          <ul className="login-hero-list">
            {loginHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="login-hero-stats">
            {loginStats.map((item) => (
              <div key={item.label} className="login-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h2>Log In</h2>
            <p>Use your registered email to continue.</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <section className="login-section">
              <div className="login-section-head">
                <h3>Account Access</h3>
                <p>Enter the same credentials you used during hostel registration.</p>
              </div>

              <div className="login-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="abc@example.com"
                  value={user.email}
                  onChange={handleChange}
                  className="login-input"
                  autoComplete="email"
                />
              </div>

              <div className="login-field login-password-field">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                  className="login-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-toggle"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </section>

            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit ${isLoading ? "is-loading" : ""}`}
            >
              {isLoading ? "Signing In..." : "Access My Account"}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/hostel_enroll" className="login-link">
              Sign Up Here
            </Link>
          </div>
          <Link
            to={`/forgot_password?email=${user.email}`}
            className="login-link secondary"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
