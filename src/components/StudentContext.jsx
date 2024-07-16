import  { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import StudentReducer from './StudentReducer';

const initialState = {
    students: [],
    filteredStudents: [],
    loading: true,
    error: null,
};

export const StudentContext = createContext(initialState);

export const StudentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StudentReducer, initialState);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Students');
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        };
        fetchStudents();
    }, []);

    const filterStudents = (searchText) => {
        dispatch({ type: 'FILTER_STUDENTS', payload: searchText });
    };

    return (
        <StudentContext.Provider value={{ state, dispatch, filterStudents }}>
            {children}
        </StudentContext.Provider>
    );
};
