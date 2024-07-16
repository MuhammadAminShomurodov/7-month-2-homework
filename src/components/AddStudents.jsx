import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../components/StudentContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    group: "",
  });
  const { state, dispatch } = useContext(StudentContext);
  const { students } = state;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/Students",
        student
      );
      dispatch({ type: "ADD_STUDENT", payload: response.data });
      toast.success("Student added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student.");
    }
  };

  const uniqueGroups = [...new Set(students.map((student) => student.group))];

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="group" className="form-label">
            Group
          </label>
          <select
            className="form-select"
            id="group"
            name="group"
            value={student.group}
            onChange={handleChange}
            required
          >
            <option value="">Select Group</option>
            {uniqueGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
