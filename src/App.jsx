// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import StudentDashboard from "./pages/StudentDashboard";
// import Home from "./pages/Home";
// import InstructorDashboard from "./pages/InstructorDashboard";
// import ShowCourseDetails from "./components/ShowCourseDetails";
// import ExploreCourses from "./pages/ExploreCourses";
// import InstructorAnalytics from "./pages/InstructorAnalytics.jsx";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/student-dashboard" element={<StudentDashboard />} />
//       <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
//       <Route
//         path="/instructor-dashboard/courses/:courseId"
//         element={<ShowCourseDetails />}
//       />
//       <Route path="/explore" element={<ExploreCourses />} />
//       <Route path="/instructor-analytics" element={<InstructorAnalytics />} />
//     </Routes>
//   );
// };

// export default App;

// App.jsx
// /src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import StudentExplore from "./components/Student/StudentExplore";
import StudentProgress from "./components/Student/StudentProgress";
import InstructorDashboard from "./pages/Instructor/InstructorDashboard";
import InstructorAnalytics from "./pages/Instructor/InstructorAnalytics";
import InstructorExplore from "./components/Instructor/InstructorExplore";
import NotFound from "./pages/NotFound";
import StudentLayout from "./layouts/StudentLayout";
import InstructorLayout from "./Layouts/InstructorLayout";
import DisplayCourseSessions from "./components/Instructor/DisplayCourseSessions";
import InstructorStudents from "./pages/Instructor/InstructorStudents";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoutes userRole="student">
              <StudentLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="discover" element={<StudentExplore />} />
          <Route path="progress" element={<StudentProgress />} />
        </Route>

        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoutes userRole="instructor">
              <InstructorLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<InstructorDashboard />} />
          <Route path="courses/:courseId" element={<DisplayCourseSessions />} />
          <Route path="analytics" element={<InstructorAnalytics />} />
          <Route path="explore" element={<InstructorExplore />} />
          <Route path="students" element={<InstructorStudents />} />
        </Route>
        
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
