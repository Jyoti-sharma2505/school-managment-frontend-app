import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "./studentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const StudentView = () => {
  const { studentsId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, status } = useSelector((state) => state.students);

  const studentView = students?.find(
    (student) => student._id === studentsId
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!studentView) {
    return <p className="text-center mt-4">Student not found</p>;
  }
  
const handleDelete = async () => {
  try {
    await dispatch(deleteStudent(studentView._id));
    toast.success("Student deleted successfully!");

    setTimeout(() => {
      navigate("/");
    }, 2000); // toast ko time milta hai
  } catch (error) {
    toast.error("Failed to delete student");
  }
};


  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
    <div className="container mt-4">
      
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Student Details</h4>
        </div>

        <div className="card-body">
          <p><strong>Name:</strong> {studentView.name}</p>
          <p><strong>Age:</strong> {studentView.age}</p>
          <p><strong>Gender:</strong> {studentView.gender}</p>
          <p><strong>Grade:</strong> {studentView.grade}</p>
          <p><strong>Attendance:</strong> {studentView.attendance}%</p>
          <p><strong>Marks:</strong> {studentView.marks}</p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/edit-student/${studentView._id}`)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentView;
