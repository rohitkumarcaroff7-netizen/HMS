import "./student.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../store/auth.jsx";

const COURSE_OPTIONS = ["All", "MCA", "MBA", "M.TECH"];

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
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setStudents([]);
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const filteredStudents = useMemo(
    () =>
      students.filter((student) =>
        filterCourse === "All" ? true : student.course === filterCourse
      ),
    [students, filterCourse]
  );

  return (
    <div className="student-details-page">
      <div className="student-shell">
        <section className="student-reminder">
          <span className="student-reminder-kicker">Room Booking Reminder</span>
          <p>Book a room first to appear in this list of hostel residents.</p>
          <p className="student-reminder-path">
            Path: Notice section / Fee Structure / Book room
          </p>
        </section>

        <section className="student-hero">
          <div className="student-hero-copy">
            <span className="student-kicker">Department Directory</span>
            <h1>Student Details</h1>
            <p>
              Browse verified hostel residents and enrolled students by course
              in a cleaner, easier-to-scan directory.
            </p>
          </div>

          <div className="student-stats">
            <div className="stat-card">
              <span>Showing</span>
              <strong>{filteredStudents.length}</strong>
            </div>
            <div className="stat-card">
              <span>Total Students</span>
              <strong>{students.length}</strong>
            </div>
          </div>
        </section>

        <section className="student-filter-panel">
          <div className="student-filter-copy">
            <span className="student-panel-kicker">Filter by Course</span>
            <h2>Choose a department stream</h2>
          </div>

          <div className="student-filters">
            {COURSE_OPTIONS.map((course) => (
              <button
                key={course}
                className={`filter-btn ${filterCourse === course ? "active" : ""}`}
                onClick={() => setFilterCourse(course)}
              >
                {course}
              </button>
            ))}
          </div>
        </section>

        {filteredStudents.length === 0 ? (
          <div className="student-empty-state">
            No students found for the selected course.
          </div>
        ) : (
          <section className="student-grid">
            {filteredStudents.map((item, index) => (
              <article
                key={item._id || item.regd_no || index}
                className="student-card"
              >
                <div className="student-card-top">
                  <img
                    src={item.photoUrl}
                    alt={item.username || "Student"}
                    className="student-avatar"
                  />

                  <div className="student-chip-stack">
                    <span className="student-chip">
                      {item.course || "Course N/A"}
                    </span>
                    <span className="student-chip muted">
                      {item.gender || "Gender N/A"}
                    </span>
                  </div>
                </div>

                <div className="student-info">
                  <h3 className="student-name">{item.username || "Unnamed Student"}</h3>
                  <p>
                    <strong>Registration No:</strong> {item.regd_no || "N/A"}
                  </p>
                  <p>
                    <strong>Year:</strong> {item.st_yr || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.email || "N/A"}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
