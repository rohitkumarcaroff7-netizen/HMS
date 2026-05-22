import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import "./eligibleStudentAdmin.css";

const API = "http://localhost:3000/api/eligible-students";

const emptyForm = {
  name: "",
  regd_no: "",
  course: "MCA",
  st_yr: "1st",
};
const COURSE_OPTIONS = ["All", "MCA", "MBA", "M.TECH"];

const EligibleStudentAdmin = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState("Eligible Student List");
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [courseFilter, setCourseFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchEligibleStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load student list.");
      }

      setTitle(data?.title || "Eligible Student List");
      setStudents(Array.isArray(data?.students) ? data.students : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEligibleStudents();
  }, [fetchEligibleStudents]);

  const persistStudentList = async (nextTitle, nextStudents, successMessage) => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: nextTitle.trim() || "Eligible Student List",
          students: nextStudents.map(({ name, regd_no, course, st_yr }) => ({
            name,
            regd_no,
            course,
            st_yr,
          })),
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save student list.");
      }

      setTitle(data?.title || "Eligible Student List");
      setStudents(Array.isArray(data?.students) ? data.students : []);

      if (successMessage) {
        toast.success(successMessage);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.regd_no.trim()) {
      setError("Student name and registration number are required.");
      return;
    }

    setError("");
    const nextStudents = [
      ...students,
      {
        _id: `${form.regd_no}-${Date.now()}`,
        name: form.name.trim(),
        regd_no: form.regd_no.trim(),
        course: form.course,
        st_yr: form.st_yr,
      },
    ];

    await persistStudentList(title, nextStudents, "Student saved to database.");
    setForm(emptyForm);
  };

  const handleRemove = async (indexToRemove) => {
    const nextStudents = students.filter((_, index) => index !== indexToRemove);
    await persistStudentList(
      title,
      nextStudents,
      "Student removed from database."
    );
  };

  const handleSave = async () => {
    await persistStudentList(
      title,
      students,
      "Eligible student list saved successfully."
    );
  };

  const filteredStudents =
    courseFilter === "All"
      ? students
      : students.filter((student) => student.course === courseFilter);
  const courseCounts = COURSE_OPTIONS.filter((course) => course !== "All").map(
    (course) => ({
      course,
      count: students.filter((student) => student.course === course).length,
    })
  );

  return (
    <div className="esa-page">
      <div className="esa-shell">
        <div className="esa-header">
          <div>
            <h1>Add Student List</h1>
            <p>Manage the eligible students shown in the Notice section.</p>
          </div>
          <div className="esa-count">{students.length} students</div>
        </div>

        {error && <div className="esa-error">{error}</div>}

        {loading ? (
          <div className="esa-loading">Loading student list...</div>
        ) : (
          <div className="esa-grid">
            <div className="esa-panel">
              <div className="esa-field">
                <label htmlFor="esa-title">List Heading</label>
                <input
                  id="esa-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Eligible Student List"
                />
              </div>

              <form className="esa-form" onSubmit={handleAddStudent}>
                <div className="esa-field">
                  <label htmlFor="name">Student Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                  />
                </div>

                <div className="esa-field">
                  <label htmlFor="regd_no">Registration No</label>
                  <input
                    id="regd_no"
                    name="regd_no"
                    type="text"
                    value={form.regd_no}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                  />
                </div>

                <div className="esa-row">
                  <div className="esa-field">
                    <label htmlFor="course">Course</label>
                    <select
                      id="course"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                    >
                      <option value="MCA">MCA</option>
                      <option value="MBA">MBA</option>
                      <option value="M.TECH">M.TECH</option>
                    </select>
                  </div>

                  <div className="esa-field">
                    <label htmlFor="st_yr">Year</label>
                    <select
                      id="st_yr"
                      name="st_yr"
                      value={form.st_yr}
                      onChange={handleChange}
                    >
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="esa-add-btn">
                  Add Student
                </button>
              </form>

              <button
                type="button"
                className="esa-save-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Student List"}
              </button>
            </div>

            <div className="esa-list-panel">
              <div className="esa-list-top">
                <div className="esa-course-status">
                  {courseCounts.map(({ course, count }) => (
                    <div key={course} className="esa-course-pill">
                      <span>{course}</span>
                      <strong>{count}</strong>
                    </div>
                  ))}
                </div>

                <div className="esa-filter">
                  <label htmlFor="esa-course-filter">Filter by Course</label>
                  <select
                    id="esa-course-filter"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                  >
                    {COURSE_OPTIONS.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredStudents.length === 0 ? (
                <div className="esa-empty">No students added yet.</div>
              ) : (
                filteredStudents.map((student) => {
                  const studentIndex = students.findIndex(
                    (entry) =>
                      (entry._id && student._id && entry._id === student._id) ||
                      (!student._id &&
                        entry.regd_no === student.regd_no &&
                        entry.name === student.name)
                  );

                  return (
                    <div
                      key={student._id || `${student.regd_no}-${student.name}`}
                      className="esa-card"
                    >
                      <div>
                        <h2>{student.name}</h2>
                        <p>Registration No: {student.regd_no}</p>
                        <p>
                          {student.course || "N/A"} | {student.st_yr || "N/A"}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="esa-remove-btn"
                        onClick={() => handleRemove(studentIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibleStudentAdmin;
