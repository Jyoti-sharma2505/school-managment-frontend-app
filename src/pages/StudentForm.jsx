import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addStudent, updateStudent } from "./studentSlice";

const StudentForm = () => {
  const { studentsId } = useParams(); // 👈 edit ke liye
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students } = useSelector((state) => state.students);

  const existingStudent = students.find(
    (student) => student._id === studentsId
  );

  // ---------------- Form State ----------------
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    grade: "",
    attendance: "",
    marks: "",
  });

  // ---------------- Prefill on Edit ----------------
  useEffect(() => {
    if (existingStudent) {
      setFormData({
        name: existingStudent.name,
        age: existingStudent.age,
        gender: existingStudent.gender,
        grade: existingStudent.grade,
        attendance: existingStudent.attendance,
        marks: existingStudent.marks,
      });
    }
  }, [existingStudent]);

  // ---------------- Change Handler ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- Submit ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentsId) {
      // ✏️ UPDATE
      dispatch(
        updateStudent({
          id: studentsId,
          updateStudent: formData,
        })
      );
    } else {
      // ➕ ADD
      dispatch(addStudent(formData));
    }

    navigate("/"); // back to list
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h4>{studentsId ? "Edit Student" : "Add Student"}</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              name="age"
              placeholder="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />

            <select
              className="form-control mb-2"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              className="form-control mb-2"
              name="grade"
              placeholder="Grade"
              value={formData.grade}
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              name="attendance"
              placeholder="Attendance"
              type="number"
              value={formData.attendance}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="marks"
              placeholder="Marks"
              type="number"
              value={formData.marks}
              onChange={handleChange}
            />

            <button className="btn btn-success me-2" type="submit">
              {studentsId ? "Update Student" : "Add Student"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
