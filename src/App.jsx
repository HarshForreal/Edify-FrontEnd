import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
import InstructorDashboard from "./pages/InstructorDashboard";
import withAuth from "./HOC/withAuth"; // Import withAuth HOC
import CourseDetails from "./pages/CourseDetails";

const App = () => {
  const StudentPage = withAuth(StudentDashboard, ["student"]);
  const InstructorPage = withAuth(InstructorDashboard, ["instructor"]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Protect the student and instructor dashboards */}
      <Route path="/student-dashboard" element={<StudentPage />} />
      <Route path="/instructor-dashboard" element={<InstructorPage />} />
    </Routes>
  );
};

export default App;
