import  { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StudentContext } from '../components/StudentContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateStudent = () => {
    const [student, setStudent] = useState({ firstName: '', lastName: '', group: '' });
    const { dispatch } = useContext(StudentContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Students/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student:', error);
                toast.error('Failed to fetch student.');
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/Students/${id}`, student);
            dispatch({ type: 'UPDATE_STUDENT', payload: response.data });
            toast.success('Student updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating student:', error);
            toast.error('Failed to update student.');
        }
    };

    return (
        <div>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
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
                    <label htmlFor="lastName" className="form-label">Last Name</label>
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
                    <label htmlFor="group" className="form-label">Group</label>
                    <input
                        type="text"
                        className="form-control"
                        id="group"
                        name="group"
                        value={student.group}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Student</button>
            </form>
        </div>
    );
};

export default UpdateStudent;
