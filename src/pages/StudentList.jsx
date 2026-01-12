import React, { useEffect } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { fetchStudents } from "./studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const StudentList = () => {
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    return (
        <div className="container mt-4">

            {/* Header Row */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-primary fw-bold mb-0">
                    🎓 Student List
                </h4>

                <Link className="btn btn-success d-flex align-items-center gap-2" to="/add-student">
                    <FaPlus size={14} />
                    Add Student
                </Link>
            </div>

            {/* Student List */}
            <div className="list-group shadow rounded">

                {students?.map((student) => (
                    <Link to={`/student/${student._id}`}>
                        <div
                            key={student._id}
                            className="list-group-item list-group-item-action
                       d-flex justify-content-between align-items-center
                       py-3"
                        >

                            {/* Name + Age */}
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-semibold text-dark me-3">
                                    {student.name}
                                </span>

                                <span className="badge bg-info text-dark">
                                    {student.age} yrs
                                </span>
                            </div>

                            {/* Arrow */}

                            <FaArrowRight className="text-primary" />

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudentList;
