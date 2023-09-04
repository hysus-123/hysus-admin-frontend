import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Sidebar from './pages/Sidebar/Sidebar';
import Home from './components/Home';
import EmployeeList from './pages/EmployeeList';
import Blog from './components/Blog';
import EmpDashboard from './pages/Dashboard';
import Form from './pages/Form';
import EditForm from './pages/EditForm';
import FullDetails from './pages/FullDetails';
import NewPage from './pages/NewPage';
import EmpPage from './pages/Employee/EmpPage';
import EmployeePage from './pages/Employees/EmpPage';
import LetterHead from './components/LetterHead';
import LetterHeadIssue from './components/LetterHeadIssue';
import EmpLetterHead from './components/EmpLetterHead';
// import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route  >
        {/* <Route path="/auth/*" element={<Sidebar />}> */}
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/emp-list" element={<EmployeeList />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/emp-dashboard" element={<EmpDashboard />} />
          <Route path="/emp-dashboard/:id" element={<EmpDashboard />} />
          <Route path="/emp-form" element={<Form />} />
          <Route path="/emp-editForm/:id" element={<EditForm />} />
          <Route path="/emp-fulldetails/:id" element={<FullDetails />} />
          <Route path="/emp-profile/:id" element={<NewPage />} />
          <Route path="/letterhead" element={<LetterHead />} />
          <Route path="/letterheadissue" element={<LetterHeadIssue />} />
          <Route path="/emp-letterhead/:id" element={<EmpLetterHead />} />
          <Route path="/emp-page" element={<EmpPage />} />
          <Route path="/employee-page" element={<EmployeePage />} />
        {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
