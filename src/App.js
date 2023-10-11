import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Sidebar from './pages/Sidebar/Sidebar';
import Home from './components/Home';
import EmployeeList from './pages/EmployeeList';
// import Blog from './components/Blog';
import EmpDashboard from './pages/Dashboard';
import Form from './pages/Form';
import EditForm from './pages/EditForm';
import FullDetails from './pages/FullDetails';
import NewPage from './pages/NewPage';
// import EmpPage from './pages/Employee/EmpPage';
// import EmployeePage from './pages/Employees/EmpPage';
import LetterHead from './components/LetterHead';
import LetterHeadIssue from './components/LetterHeadIssue';
import EmpLetterHead from './components/EmpLetterHead';
import CountryApi from './components/countries/country';
import Attendance from './pages/Attendance';
import EmpForm from './pages/EmployeeForm/EmpForm';
import Holiday from './components/Holidays/Holiday';
import Department from './components/Department/Department';
import Payroll from './components/Payroll/Payroll';
import ParticularPayroll from './components/Payroll/ParticularPayroll';
// import HorizontalDropdown from './components/HorizontalDropDown';
// import NewCalendar from './components/NewCalendar';

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
          {/* <Route path="/blogs" element={<Blog />} /> */}
          <Route path="/emp-dashboard" element={<EmpDashboard />} />
          <Route path="/emp-dashboard/:id" element={<EmpDashboard />} />
          <Route path="/emp-form" element={<Form />} />
          <Route path="/emp-editForm/:id" element={<EditForm />} />
          <Route path="/emp-fulldetails/:id" element={<FullDetails />} />
          <Route path="/emp-profile/:id" element={<NewPage />} />
          <Route path="/letterhead" element={<LetterHead />} />
          <Route path="/letterheadissue" element={<LetterHeadIssue />} />
          <Route path="/attendance" element={<Attendance/>} />
          <Route path="/emp-letterhead/:id" element={<EmpLetterHead />} />
          <Route path="/holidays" element={<Holiday />} />
          <Route path="/department" element={<Department />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payroll/:id" element={<ParticularPayroll />} />
          <Route path="/employee-form" element={<EmpForm />} />
          {/* <Route path="/emp-page" element={<EmpPage />} />
          <Route path="/employee-page" element={<EmployeePage />} /> */}
          <Route path="/country-api" element={<CountryApi />} />
          {/* <Route path="/horizontal" element={<HorizontalDropdown />} />
          <Route path="/newCalendar" element={<NewCalendar />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
