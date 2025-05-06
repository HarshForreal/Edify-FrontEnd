// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoutes from "./components/ProtectedRoutes";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import StudentDashboard from "./pages/StudentDashboard";
// import StudentExplore from "./components/Student/StudentExplore";
// import StudentProgress from "./components/Student/StudentProgress";
// import InstructorDashboard from "./pages/Instructor/InstructorDashboard";
// import InstructorAnalytics from "./pages/Instructor/InstructorAnalytics";
// import InstructorExplore from "./components/Instructor/InstructorExplore";
// import NotFound from "./pages/NotFound";
// import StudentLayout from "./layouts/StudentLayout";
// import InstructorLayout from "./Layouts/InstructorLayout";
// import DisplayCourseSessions from "./components/Instructor/DisplayCourseSessions";
// import InstructorStudents from "./pages/Instructor/InstructorStudents";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/student-dashboard"
//           element={
//             <ProtectedRoutes userRole="student">
//               <StudentLayout />
//             </ProtectedRoutes>
//           }
//         >
//           <Route index element={<StudentDashboard />} />
//           <Route path="discover" element={<StudentExplore />} />
//           <Route path="progress" element={<StudentProgress />} />
//         </Route>

//         <Route
//           path="/instructor-dashboard"
//           element={
//             <ProtectedRoutes userRole="instructor">
//               <InstructorLayout />
//             </ProtectedRoutes>
//           }
//         >
//           <Route index element={<InstructorDashboard />} />
//           <Route path="courses/:courseId" element={<DisplayCourseSessions />} />
//           <Route path="analytics" element={<InstructorAnalytics />} />
//           <Route path="explore" element={<InstructorExplore />} />
//           <Route path="students" element={<InstructorStudents />} />
//         </Route>

//         {/* Not Found */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </AuthProvider>
//   );
// };

// export default App;

// ! Adding google route
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

// Pages and Components
import Signup from "./pages/Signup";
import Login from "./pages/Login";
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
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Student Routes */}
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
          {/* Protected routes for instructors */}
          <Route
            path="/instructor-dashboard"
            element={
              <ProtectedRoutes userRole="instructor">
                <InstructorLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<InstructorDashboard />} />
            <Route
              path="courses/:courseId"
              element={<DisplayCourseSessions />}
            />
            <Route path="analytics" element={<InstructorAnalytics />} />
            <Route path="explore" element={<InstructorExplore />} />
            <Route path="students" element={<InstructorStudents />} />
          </Route>
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
