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

const EligibleStudentAdmin = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState("Eligible Student List");
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.regd_no.trim()) {
      setError("Student name and registration number are required.");
      return;
    }

    setError("");
    setStudents((prev) => [
      ...prev,
      {
        _id: `${form.regd_no}-${Date.now()}`,
        name: form.name.trim(),
        regd_no: form.regd_no.trim(),
        course: form.course,
        st_yr: form.st_yr,
      },
    ]);
    setForm(emptyForm);
  };

  const handleRemove = (indexToRemove) => {
    setStudents((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
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
          title: title.trim() || "Eligible Student List",
          students: students.map(({ name, regd_no, course, st_yr }) => ({
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
      toast.success("Eligible student list saved successfully.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

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
              {students.length === 0 ? (
                <div className="esa-empty">No students added yet.</div>
              ) : (
                students.map((student, index) => (
                  <div
                    key={student._id || `${student.regd_no}-${index}`}
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
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibleStudentAdmin;
