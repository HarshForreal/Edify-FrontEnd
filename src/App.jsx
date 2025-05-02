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
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthContext
import ProtectedRoutes from "./components/ProtectedRoutes"; // Import ProtectedRoutes

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import Home from "./pages/Home";
import InstructorDashboard from "./pages/InstructorDashboard";
import ShowCourseDetails from "./components/ShowCourseDetails";
import ExploreCourses from "./pages/ExploreCourses";
import InstructorAnalytics from "./pages/InstructorAnalytics";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoutes userRole="student">
              <StudentDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoutes userRole="instructor">
              <InstructorDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/instructor-dashboard/courses/:courseId"
          element={
            <ProtectedRoutes userRole="instructor">
              <ShowCourseDetails />
            </ProtectedRoutes>
          }
        />
        <Route path="/instructor-analytics" element={<InstructorAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
