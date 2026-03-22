import "./student.css";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth.jsx";

export const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [filterCourse, setFilterCourse] = useState("All");
  const { token } = useAuth();

  const getData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/allUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStudents(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const filteredStudents = students.filter((student) =>
    filterCourse === "All" ? true : student.course === filterCourse
  );

  return (
    <div className="student-details-page">
      <div className="remdr w-[30%]"><h1> &nbsp; Reminder : Book a room to be added in list.</h1> 
      <h1>    &nbsp; Path : Notice section / Fee Structure / Book room </h1></div>
      
      <div className="student-shell">
        <div className="student-header">
          <div>
            <h1>Student Directory</h1>
            <p>Verified hostel residents and enrolled students.</p>
          </div>
          <div className="student-stats">
            <div className="stat">
              <span>Showing</span>
              <strong>{filteredStudents.length}</strong>
            </div>
            <div className="stat">
              <span>Total</span>
              <strong>{students.length}</strong>
            </div>
          </div>
        </div>

        <div className="student-filters">
          {["All", "MCA", "MBA", "M.TECH"].map((course) => (
            <button
              key={course}
              className={`filter-btn ${filterCourse === course ? "active" : ""}`}
              onClick={() => setFilterCourse(course)}
            >
              {course}
            </button>
          ))}
        </div>

        <div className="student-grid">
          {filteredStudents.map((item, index) => (
            <div key={index} className="student-card">
              <img
                src={item.photoUrl}
                alt={item.username}
                className="student-avatar"
              />
              <div className="student-info">
                <p className="student-name">{item.username}</p>
                <p>Registration No: {item.regd_no}</p>
                <p>Gender: {item.gender}</p>
                <p>Course: {item.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
