import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./getuser.css"
const GetUser = () => {
  const [user, setUser] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch === "" ||
      item.username?.toLowerCase().includes(normalizedSearch) ||
      item.regd_no?.toLowerCase().includes(normalizedSearch);

    return matchesCourse && matchesYear && matchesSearch;
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

          <div className="filter-group search-group">
            <label htmlFor="userSearch">Search User</label>
            <input
              id="userSearch"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by username or registration ID"
            />
          </div>
        </div>

        <div className="user-list">
          {filteredUsers.length === 0 ? (
            <div className="user-empty">
              No users match the selected filters or search term.
            </div>
          ) : (
            filteredUsers.map((item) => (
              <div key={item._id} className="detailcard user-card">
                <div className="user-card-top">
                  <div className="user-avatar-wrap">
                    <img
                      src={item.photoUrl}
                      alt={item.username}
                      className="user-avatar"
                    />
                  </div>

                  <div className="user-identity">
                    <span className="user-tag">{item.course || "Student"}</span>
                    <h2>{item.username}</h2>
                    <p>{item.email}</p>
                  </div>
                </div>

                <div className="user-quick-meta">
                  <div className="user-meta-pill">
                    <span>Year</span>
                    <strong>{item.st_yr || "N/A"}</strong>
                  </div>
                  <div className="user-meta-pill">
                    <span>Regd. No</span>
                    <strong>{item.regd_no || "N/A"}</strong>
                  </div>
                </div>

                <div className="user-card-body">
                  <div className="user-detail-item">
                    <span>Phone Number</span>
                    <strong>{item.phone || "N/A"}</strong>
                  </div>
                  <div className="user-detail-item user-detail-wide">
                    <span>Address</span>
                    <strong>{item.address || "N/A"}</strong>
                  </div>
                </div>

                <button
                  className="delbtn user-delete"
                  onClick={() => removeUser(item._id)}
                >
                  Remove User
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GetUser;
