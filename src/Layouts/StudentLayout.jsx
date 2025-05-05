import React from "react";
import StudentSidebar from "../components/Student/StudentSidebar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
