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
import AddLesson from "./components/portal/addLesson";
import Error404 from "./pages/404";
import Notifications from "./components/portal/notifications";
import Details from "./components/portal/details";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Routes location={background || location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Navigate to="/"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/survey" element={<Survey/>}/>
        
        <Route path='/portal' element={<ProtectedRoute><Portal/></ProtectedRoute>}/>
        <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>

        <Route path="/404" element={<Error404/>}/>
        <Route path='/*' element={<Navigate to="/404"/>}/>
      </Routes>

      {background && (
        <Routes>
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/details" element={<Details />} />
          <Route path="/addlesson" element={<AddLesson />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
