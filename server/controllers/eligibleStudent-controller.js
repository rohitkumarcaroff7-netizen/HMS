import { EligibleStudentList } from "../models/eligibleStudent-model.js";

const defaultEligibleStudentList = {
  title: "Eligible Student List",
  students: [],
};

const normalizeStudent = (student) => ({
  name: String(student?.name || "").trim(),
  regd_no: String(student?.regd_no || "").trim(),
  course: String(student?.course || "").trim(),
  st_yr: String(student?.st_yr || "").trim(),
});

export const getEligibleStudentList = async (req, res) => {
  try {
    const list = await EligibleStudentList.findOne().sort({ updatedAt: -1 });
    res.status(200).json(list || defaultEligibleStudentList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const upsertEligibleStudentList = async (req, res) => {
  try {
    const { title, students } = req.body;

    if (!Array.isArray(students)) {
      return res
        .status(400)
        .json({ message: "Students list must be an array." });
    }

    const normalizedStudents = students
      .map(normalizeStudent)
      .filter((student) => student.name && student.regd_no);

    const payload = {
      title: String(title || "Eligible Student List").trim(),
      students: normalizedStudents,
    };

    const existing = await EligibleStudentList.findOne().sort({ updatedAt: -1 });

    if (existing) {
      existing.title = payload.title;
      existing.students = payload.students;
      await existing.save();
      return res.status(200).json(existing);
    }

    const created = await EligibleStudentList.create(payload);
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
