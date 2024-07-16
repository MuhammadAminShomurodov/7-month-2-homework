import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StudentProvider } from './components/StudentContext';
import AllStudents from './components/AllStudents';
import AddStudent from './components/AddStudents';
import UpdateStudent from './components/Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <StudentProvider>
            <Router>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<AllStudents />} />
                        <Route path="/add" element={<AddStudent />} />
                        <Route path="/update/:id" element={<UpdateStudent />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </Router>
        </StudentProvider>
    );
};

export default App;
