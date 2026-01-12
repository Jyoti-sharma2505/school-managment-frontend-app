import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, updateSchoolStats, setTopStudent } from "./studentSlice";

const SchoolView = () => {
  const dispatch = useDispatch();

  const {
    students,
    totalStudents,
    averageAttendance,
    averageMarks,
    topStudent,
    status,
  } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  /* ---------- Calculate School Stats ---------- */
  useEffect(() => {
    if (students.length === 0) return;

    const total = students.length;

    const attendanceSum = students.reduce(
      (sum, student) => sum + Number(student.attendance || 0),
      0
    );

    const marksSum = students.reduce(
      (sum, student) => sum + Number(student.marks || 0),
      0
    );

    const avgAttendance = attendanceSum / total;
    const avgMarks = marksSum / total;

    const topStudentData = students.reduce((top, current) =>
      current.marks > (top?.marks ?? 0) ? current : top
    , null);

    dispatch(
      updateSchoolStats({
        totalStudents: total,
        averageAttendance: avgAttendance,
        averageMarks: avgMarks,
        topStudent: topStudentData,
      })
    );

    dispatch(setTopStudent(topStudentData));
  }, [students, dispatch]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h1 className="h4 mb-0">🏫 School View</h1>
        </div>

        <div className="card-body">
          <p>
            <strong>Total Students:</strong> {totalStudents}
          </p>

          <p>
            <strong>Average Attendance:</strong>{" "}
            {averageAttendance.toFixed(2)}%
          </p>

          <p>
            <strong>Average Marks:</strong> {averageMarks.toFixed(2)}
          </p>

          <p>
            <strong>Top Performing Student:</strong>{" "}
            {topStudent ? topStudent.name : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
