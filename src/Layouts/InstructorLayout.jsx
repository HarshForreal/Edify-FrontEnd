import InstructorSidebar from "../components/Instructor/InstructorSidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <InstructorSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default InstructorLayout;
