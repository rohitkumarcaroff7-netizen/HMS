import { useEffect, useMemo, useState } from "react";
import "./eligible-students.css";

const API = "http://localhost:3000/api/eligible-students";

const COURSES = ["All", "MCA", "MBA", "M.TECH"];

const EligibleStudentList = () => {
  const [students, setStudents] = useState([]);
  const [title, setTitle] = useState("Eligible Student List");
  const [filterCourse, setFilterCourse] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEligibleStudents = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json().catch(() => []);

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load eligible students.");
        }

        setTitle(data?.title || "Eligible Student List");
        setStudents(Array.isArray(data?.students) ? data.students : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEligibleStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      filterCourse === "All" ? true : student.course === filterCourse
    );
  }, [students, filterCourse]);

  return (
    <div className="eligible-page">
      <div className="eligible-shell">
        <div className="eligible-banner">
          <div>
            <h1>{title}</h1>
            <p>
              Students listed below are currently eligible to apply for hostel.
            </p>
          </div>
          <div className="eligible-stats">
            <div className="eligible-stat">
              <span>Showing</span>
              <strong>{filteredStudents.length}</strong>
            </div>
            <div className="eligible-stat">
              <span>Total Eligible</span>
              <strong>{students.length}</strong>
            </div>
          </div>
        </div>

        <div className="eligible-note">
          This list is managed by the hostel admin for students eligible to apply.
        </div>

        <div className="eligible-filters">
          {COURSES.map((course) => (
            <button
              key={course}
              className={`eligible-filter-btn ${
                filterCourse === course ? "active" : ""
              }`}
              onClick={() => setFilterCourse(course)}
            >
              {course}
            </button>
          ))}
        </div>

        {loading && <p className="eligible-status">Loading eligible students...</p>}
        {error && <p className="eligible-status error">{error}</p>}
        {!loading && !error && filteredStudents.length === 0 && (
          <p className="eligible-status">No eligible students found.</p>
        )}

        {!loading && !error && filteredStudents.length > 0 && (
          <div className="eligible-table-wrap">
            <table className="eligible-table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Student Name</th>
                  <th>Registration No.</th>
                  <th>Course</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id || `${student.regd_no}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.regd_no}</td>
                    <td>{student.course || "N/A"}</td>
                    <td>{student.st_yr || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibleStudentList;
