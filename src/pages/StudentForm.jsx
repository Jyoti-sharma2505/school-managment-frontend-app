import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addStudent, updateStudent } from "./studentSlice";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
    const [errors, setErrors] = useState({});

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

    // ----------------Validation

    // const validateForm = () => {
    //     const newErrors = {};

    //     if (!formData.name.trim()) {
    //         newErrors.name = "Name is required";
    //     } else if (formData.name.length < 2) {
    //         newErrors.name = "Name must be at least 2 characters";
    //     }

    //     if (!formData.age || formData.age <= 0) {
    //         newErrors.age = "Valid age is required";
    //     }

    //     if (!formData.gender) {
    //         newErrors.gender = "Gender is required";
    //     }

    //     if (!formData.grade.trim()) {
    //         newErrors.grade = "Grade is required";
    //     }

    //     if (
    //         formData.attendance === "" ||
    //         formData.attendance < 0 ||
    //         formData.attendance > 100
    //     ) {
    //         newErrors.attendance = "Attendance must be between 0 and 100";
    //     }

    //     if (
    //         formData.marks === "" ||
    //         formData.marks < 0 ||
    //         formData.marks > 100
    //     ) {
    //         newErrors.marks = "Marks must be between 0 and 100";
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };



    // ---------------- Submit ----------------
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!validateForm()) return;

        if (studentsId) {
            // ✏️ UPDATE
            dispatch(
                updateStudent({
                    id: studentsId,
                    updateStudent: formData,
                }),

            );
            toast.success("Student updated successfully!")
        } else {
            // ➕ ADD
            dispatch(addStudent(formData));
            toast.success("Student added successfully!");
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }

        // navigate("/"); // back to list
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <div className="card shadow">
                <div className="card-header bg-warning">
                    <h4>{studentsId ? "Edit Student" : "Add Student"}</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input
                            required
                            className="form-control mb-2"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {/* {errors.name && <div className="invalid-feedback">{errors.name}</div>} */}

                        <input
                            required
                            className="form-control mb-2"
                            name="age"
                            placeholder="Age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        {/* {errors.age && <div className="invalid-feedback">{errors.age}</div>} */}

                        <select
                            required
                            className="form-control mb-2"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {/* {errors.gender && <div className="invalid-feedback">{errors.gender}</div>} */}

                        <input
                            required
                            className="form-control mb-2"
                            name="grade"
                            placeholder="Grade"
                            value={formData.grade}
                            onChange={handleChange}
                        />
                        {/* {errors.grade && <div className="invalid-feedback">{errors.grade}</div>} */}

                        <input
                            required
                            className="form-control mb-2"
                            name="attendance"
                            placeholder="Attendance"
                            type="number"
                            value={formData.attendance}
                            onChange={handleChange}
                        />
                        {/* {errors.attendance && <div className="invalid-feedback">{errors.attendance}</div>} */}

                        <input
                            required
                            className="form-control mb-3"
                            name="marks"
                            placeholder="Marks"
                            type="number"
                            value={formData.marks}
                            onChange={handleChange}
                        />
                        {/* {errors.marks && <div className="invalid-feedback">{errors.marks}</div>} */}

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
