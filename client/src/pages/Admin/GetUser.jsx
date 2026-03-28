import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./getuser.css"
const GetUser = () => {
  const [user, setUser] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const { token } = useAuth();
  const getUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const removeUser = async(id)=>{
    try {
        const res = await fetch(`http://localhost:3000/api/admin/deleteUser/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        getUser()
        alert("User Removed");
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  const courseOptions = ["All", ...new Set(user.map((item) => item.course).filter(Boolean))];
  const yearOptions = ["All", ...new Set(user.map((item) => item.st_yr).filter(Boolean))];

  const filteredUsers = user.filter((item) => {
    const matchesCourse = selectedCourse === "All" || item.course === selectedCourse;
    const matchesYear = selectedYear === "All" || item.st_yr === selectedYear;
    return matchesCourse && matchesYear;
  });

  return (
    <div className="user-page">
      <div className="userdetails">
        <div className="user-header">
          <div>
            <h1 className="dhead">User Details</h1>
            <p className="user-sub">Scroll horizontally to browse all users.</p>
          </div>
          <div className="user-count">{filteredUsers.length} users</div>
        </div>

        <div className="user-filters">
          <div className="filter-group">
            <label htmlFor="courseFilter">Course</label>
            <select
              id="courseFilter"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="yearFilter">Year of Study</label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="user-list">
          {filteredUsers.map((item, index) => (
            <div key={index} className="detailcard user-card">
              <div className="user-card-body">
                <img src={item.photoUrl} alt={item.username} className="user-avatar" />
                <h2>Name : {item.username}</h2>
                <p>Course : {item.course}</p>
                <p>Year of study : {item.st_yr}</p>
                <p>Phone Number : {item.phone}</p>
                <p>Address : {item.address}</p>
                <p>Email : {item.email}</p>
                <h3>Registration No : {item.regd_no}</h3>
              </div>
              <button
                className="delbtn user-delete"
                onClick={() => removeUser(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetUser;
