import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/home";
import Survey from "./pages/survey";
import Login from "./pages/login";
import Register from "./pages/register";
import Portal from "./pages/portal";
import ProtectedRoute from "./authenticate/ProtectedRoute";
import Admin from "./pages/admin";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/test-level" element={<Survey/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/portal' element={<ProtectedRoute><Portal/></ProtectedRoute>}/>
          <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>

          <Route path='/*' element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
