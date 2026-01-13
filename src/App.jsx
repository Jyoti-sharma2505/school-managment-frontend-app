import { useState } from 'react'
// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Headers from './components/Headers';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import { Route, Routes } from 'react-router-dom';
import StudentView from './pages/StudentView';
import ClassView from './pages/ClassView';
import SchoolView from './pages/SchoolView';
// import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
     <Headers/>
      {/* <ToastContainer position="top-right" autoClose={50000} /> */}
     <Routes>
      <Route path='/' element={<StudentList/>}/>
      <Route path='/add-student/' element={<StudentForm/>}/>
      <Route path='/edit-student/:studentsId' element={<StudentForm/>}/>
      <Route path='/student/:studentsId' element={<StudentView/>}/>
      <Route path='/class-view' element={<ClassView/>}/>
      <Route path='/school-view' element={<SchoolView/>}/>
     </Routes>
        
    </>
  )
}

export default App
