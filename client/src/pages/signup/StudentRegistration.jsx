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
          <div className="signup-hero-badge">Hostel Registration Form</div><br /><br />
          <h1 className="text-2xl">Create Your Hostel Profile</h1><br />
          <p className="font-bold text-sm">
            A clean, secure record helps you access room booking, notices, and
            hostel services faster. Fill in accurate details for verification.
          </p>
          <br />
          <ul className="signup-hero-list text-sm">
            <li>Verified student records</li>
            <li>Faster room allocation</li>
            <li>Instant notice updates</li>
          </ul>
        </div>

        <div className="signup-card">
          <div className="signup-header">
            <h2>Sign Up</h2>
            <p>Use your official details for approval.</p>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
          <div>
            <label
              htmlFor="username"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder=" Enter your username"
              value={user.username}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder=" +91 1234567890"
              value={user.phone}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" abc@example.com"
              value={user.email}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="signup-row">
            <div>
              <label className="text-sm" htmlFor="gender">Gender</label>
              <select className="signup-select" name="gender" id="gender" value={user.gender} onChange={handleChange}>
                <option value="" className="option">Choose an option</option>
                <option value="male" className="option">Male</option>
                <option value="female" className="option">Female</option>
              </select>
            </div>
            <div>
              <label className="text-sm" htmlFor="course">Course</label>
              <select className="signup-select" name="course" id="course" value={user.course} onChange={handleChange}>
                <option className="option" value="">Choose an option</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="M.TECH">M.Tech</option>
              </select>
            </div>
            <div>
              <label className="text-sm" htmlFor="st_yr">Year</label>
              <select className="signup-select" name="st_yr" id="st_yr" value={user.st_yr} onChange={handleChange}>
                <option value="">Choose an option</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="regd_no"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Regd_no
            </label>
            <input
              type="text"
              id="regd_no"
              name="regd_no"
              placeholder=" Enter your college registration number"
              value={user.regd_no}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="address">Address</label>
            <textarea className="signup-textarea" name="address" id="address" value={user.address} onChange={handleChange} placeholder=" Address" />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder=" ********"
              value={user.password}
              onChange={handleChange}
              className="signup-input"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="signup-toggle"
            >
              {!showPassword ? (
                <p className="text-sm">Show</p>
              ) : (
                <p className="text-sm">Hide</p>
              )}
            </span>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=" ********"
              value={user.confirmPassword}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`signup-submit ${isLoading ? "is-loading" : ""}`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
          <div className="signup-footer">
            <p className="text-sm">
              Already have an account?
            </p>
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
