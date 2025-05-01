import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
import InstructorDashboard from "./pages/InstructorDashboard";
import ShowCourseDetails from "./components/ShowCourseDetails";
import ExploreCourses from "./pages/ExploreCourses";
import InstructorAnalytics from "./pages/InstructorAnalytics.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
      <Route
        path="/instructor-dashboard/courses/:courseId"
        element={<ShowCourseDetails />}
      />
      <Route path="/explore" element={<ExploreCourses />} />
      <Route path="/instructor-analytics" element={<InstructorAnalytics />} />
    </Routes>
  );
};

export default App;
