import React from "react";
import { Button } from "../ui/button";
import { BookOpen, FolderOpen, Settings, LogOut, Origami } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-60 bg-white border-r p-4">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Origami className="text-black" />
          <span className="text-xl font-bold text-black">Edify</span>
        </div>
      </div>

      <nav className="mt-4 space-y-1">
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            currentPath === "/student-dashboard" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleNavigation("/student-dashboard")}
        >
          <BookOpen className="mr-2 h-4 w-4" /> My Courses
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            currentPath === "/student-dashboard/discover" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleNavigation("/student-dashboard/discover")}
        >
          <FolderOpen className="mr-2 h-4 w-4" /> Browse Courses
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            currentPath === "/student-dashboard/progress" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleNavigation("/student-dashboard/progress")}
        >
          <Settings className="mr-2 h-4 w-4" /> Progress
        </Button>
      </nav>

      <div className="absolute bottom-4">
        <Button
          variant="ghost"
          className="w-full flex justify-center gap-2 hover:text-white hover:bg-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-6" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default StudentSidebar;
