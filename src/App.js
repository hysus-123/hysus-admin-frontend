import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import EmpDashboard from './pages/Dashboard';
import EditForm from './pages/EditForm';
import Form from './pages/Form';
import FullDetails from './pages/FullDetails';
import NewPage from './pages/NewPage';
// import Sidebar from './pages/Sidebar/Sidebar';


function App() {
  return (
    <BrowserRouter>
      {/* <Login/> */}
      {/* <Sidebar/> */}
      <Navbar/>
      <Routes>
          <Route>
          {/* <Route path='/' element={<Sidebar/>}/> */}
          {/* <Route path='/auth' element={<Sidebar/>}> */}
          <Route path='/' element={<Login/>}/>
          <Route path='/emp-list' element={<EmployeeList/>}/>
          <Route path='/emp-form' element={<Form/>}/>
          <Route path='/emp-dashboard' element={<EmpDashboard/>}/>
          <Route path='/emp-dashboard/:id' element={<EmpDashboard/>}/>
          <Route path='/emp-editForm/:id' element={<EditForm/>}/>
          <Route path='/emp-fulldetails/:id' element={<FullDetails/>}/>
          <Route path='/emp-profile/:id' element={<NewPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
