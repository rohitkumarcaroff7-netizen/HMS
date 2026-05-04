import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./studentRegistration.css"

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    gender: "",
    regd_no: "",
    address: "",
    email: "",
    phone: "",
    course: "",
    st_yr: "",
    password: "",
    confirmPassword:"",
  });
  const navigate = useNavigate();
  const highlights = [
    "Verified student onboarding",
    "Faster room allocation workflow",
    "Centralized notices and hostel updates",
  ];

  const trustPoints = [
    { value: "10 min", label: "Average completion time" },
    { value: "24/7", label: "Digital access to your profile" },
    { value: "1 step", label: "Single form for enrollment" },
  ];
  

  const isDark = false
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkInput = () => {
    const { username, gender, regd_no, address, email, phone, course, st_yr, password, confirmPassword } = user;
    if (!username || !gender || !regd_no || !address || !email || !phone || !course || !st_yr || !password || !confirmPassword) {
      console.error("All fields are required.");
      alert("All fields required.")
      return false;
    }
    if (password.length < 6) {
      console.error("Password must be at least 6 characters.");
      alert("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      
      const res_data =await response.json();
      console.log(res_data) ;

      if (response.ok) {
        
        console.log("Registration successful.");
        alert("Registration successfull.")
        navigate("/login");
        
      } else {
        alert(res_data.msg || res_data.extraDetails.message)
        console.error("Authentication failed.");
        alert("Authentication failed.");
      }
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-grid">
        <div className="signup-hero">
          <div className="signup-hero-badge">Hostel Registration Form</div>
          <h1>Create Your Hostel Profile</h1>
          <p>
            Start your hostel enrollment with a clean, secure student profile.
            Accurate details help the team verify you faster and keep room,
            payment, and notice access in one place.
          </p>
          <ul className="signup-hero-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="signup-hero-stats">
            {trustPoints.map((point) => (
              <div key={point.label} className="signup-stat-card">
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="signup-card">
          <div className="signup-header">
            <h2>Enroll Now</h2>
            <p>Use your official academic details for hostel approval.</p>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <section className="signup-section">
              <div className="signup-section-head">
                <h3>Personal Details</h3>
                <p>These details are used to identify and contact you.</p>
              </div>

              <div className="signup-field">
                <label
                  htmlFor="username"
                  className={`signup-label ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={handleChange}
                  className="signup-input"
                  autoComplete="username"
                />
              </div>

              <div className="signup-split">
                <div className="signup-field">
                  <label
                    htmlFor="phone"
                    className={`signup-label ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="+91 1234567890"
                    value={user.phone}
                    onChange={handleChange}
                    className="signup-input"
                    autoComplete="tel"
                  />
                </div>

                <div className="signup-field">
                  <label
                    htmlFor="email"
                    className={`signup-label ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="abc@example.com"
                    value={user.email}
                    onChange={handleChange}
                    className="signup-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="signup-field">
                <label className="signup-label" htmlFor="address">Address</label>
                <textarea
                  className="signup-textarea"
                  name="address"
                  id="address"
                  value={user.address}
                  onChange={handleChange}
                  placeholder="Enter your current address"
                  autoComplete="street-address"
                />
              </div>
            </section>

            <section className="signup-section">
              <div className="signup-section-head">
                <h3>Academic Details</h3>
                <p>Use the same details submitted in your college records.</p>
              </div>

              <div className="signup-row">
                <div className="signup-field">
                  <label className="signup-label" htmlFor="gender">Gender</label>
                  <select className="signup-select" name="gender" id="gender" value={user.gender} onChange={handleChange}>
                    <option value="" className="option">Choose an option</option>
                    <option value="male" className="option">Male</option>
                    <option value="female" className="option">Female</option>
                  </select>
                </div>
                <div className="signup-field">
                  <label className="signup-label" htmlFor="course">Course</label>
                  <select className="signup-select" name="course" id="course" value={user.course} onChange={handleChange}>
                    <option className="option" value="">Choose an option</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="M.TECH">M.Tech</option>
                  </select>
                </div>
                <div className="signup-field">
                  <label className="signup-label" htmlFor="st_yr">Year</label>
                  <select className="signup-select" name="st_yr" id="st_yr" value={user.st_yr} onChange={handleChange}>
                    <option value="">Choose an option</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                  </select>
                </div>
              </div>

              <div className="signup-field">
                <label
                  htmlFor="regd_no"
                  className={`signup-label ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="regd_no"
                  name="regd_no"
                  placeholder="Enter your college registration number"
                  value={user.regd_no}
                  onChange={handleChange}
                  className="signup-input"
                />
              </div>
            </section>

            <section className="signup-section">
              <div className="signup-section-head">
                <h3>Account Security</h3>
                <p>Create a password to access hostel notices and services.</p>
              </div>

              <div className="signup-split">
                <div className="signup-field signup-password-field">
                  <label
                    htmlFor="password"
                    className={`signup-label ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Minimum 6 characters"
                    value={user.password}
                    onChange={handleChange}
                    className="signup-input"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="signup-toggle"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="signup-field">
                  <label
                    htmlFor="confirmPassword"
                    className={`signup-label ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className="signup-input"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </section>

          <button
            type="submit"
            disabled={isLoading}
            className={`signup-submit ${isLoading ? "is-loading" : ""}`}
          >
            {isLoading ? "Creating Account..." : "Create Hostel Account"}
          </button>
        </form>
          <div className="signup-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="signup-link">
              Log In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup
