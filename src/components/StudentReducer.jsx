const StudentReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        students: action.payload,
        filteredStudents: action.payload,
        loading: false,
      };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "FILTER_STUDENTS":
      return { ...state, filteredStudents: action.payload };
    case "ADD_STUDENT":
      const newStudents = [...state.students, action.payload];
      newStudents.sort((a, b) => a.id - b.id); 
      return { ...state, students: newStudents, filteredStudents: newStudents };
    case "UPDATE_STUDENT":
      const updatedStudents = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      updatedStudents.sort((a, b) => a.id - b.id); 
      return {
        ...state,
        students: updatedStudents,
        filteredStudents: updatedStudents,
      };
    case "DELETE_STUDENT":
      const remainingStudents = state.students.filter(
        (student) => student.id !== action.payload
      );
      remainingStudents.sort((a, b) => a.id - b.id); 
      return {
        ...state,
        students: remainingStudents,
        filteredStudents: remainingStudents,
      };
    default:
      return state;
  }
};

export default StudentReducer;
