import React from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from "./pages/home";
import Survey from "./pages/survey";
import Login from "./pages/login";
import Register from "./pages/register";
import Portal from "./pages/portal";
import ProtectedRoute from "./authenticate/ProtectedRoute";
import Admin from "./pages/admin";
import Payment from "./components/portal/payment";
import Feedback from "./components/portal/feedback";
import EditLesson from "./components/portal/editLesson";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Routes location={background || location}>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/portal' element={
          <ProtectedRoute>
            <Portal/>
          </ProtectedRoute>
        }/>
        <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>

        <Route path='/*' element={<Navigate to="/"/>}/>
      </Routes>

      {background && (
        <Routes>
          <Route path="/payment" element={<Payment />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/editlesson" element={<EditLesson />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
