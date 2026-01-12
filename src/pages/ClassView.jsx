import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "./studentSlice";

const ClassView = () => {
  const dispatch = useDispatch();

  const { students, filter, sortBy, status } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  /* ---------------- FILTER ---------------- */
  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) =>
          filter === "Boys"
            ? student.gender === "Male"
            : student.gender === "Female"
        );

  /* ---------------- SORT ---------------- */
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "marks") {
      return b.marks - a.marks;
    }
    if (sortBy === "attendance") {
      return b.attendance - a.attendance;
    }
    return 0;
  });

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="card shadow mb-4">
        <div className="card-body d-flex justify-content-between flex-wrap gap-3">
          {/* FILTER */}
          <div>
            <label className="fw-bold me-2">Filter :</label>
            <select
              className="form-select d-inline w-auto"
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
            >
              <option value="All">All</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>
          </div>

          {/* SORT */}
          <div>
            <label className="fw-bold me-2">Sort By :</label>
            <select
              className="form-select d-inline w-auto"
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <option value="name">Name</option>
              <option value="marks">Marks</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>
        </div>
      </div>

      {/* STATUS */}
      {status === "loading" && <p>Loading students...</p>}

      {/* STUDENT TABLE */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📚 Class View</h5>
        </div>

        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Grade</th>
                <th>Marks</th>
                <th>Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.length > 0 ? (
                sortedStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          student.gender === "Male"
                            ? "bg-info"
                            : "bg-warning"
                        }`}
                      >
                        {student.gender}
                      </span>
                    </td>
                    <td>{student.grade}</td>
                    <td>{student.marks}</td>
                    <td>{student.attendance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-3">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassView;
