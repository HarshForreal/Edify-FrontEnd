import React from "react";
import { Button } from "../components/ui/button";
import {
  BookOpen,
  LogOut,
  Telescope,
  ChartNoAxesCombined,
  Origami,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import authSerivce from "@/services/authService";
const InstructorSidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await authSerivce.logout();
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleNavigation = (page) => {
    setActivePage(page);

    // If the page is "explore", navigate to the ExploreCourses page
    if (page === "explore") {
      navigate("/explore"); // Navigate to ExploreCourses page when "Explore" is clicked
    }
    // If the page is "add session" (for example), go to the ShowCourseDetails page
    else if (page === "add-session") {
      navigate(`/instructor-dashboard/courses/${page}`); // Navigate to the course session page
    } else if (page === "analytics") {
      navigate(`/instructor-analytics`);
    }
    // For other sidebar navigation (like "My Courses", "Settings")
    else {
      navigate("/instructor-dashboard"); // Default to Instructor Dashboard for all other cases
    }
  };

  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Origami className="text-black" />
          <span className="text-xl font-bold text-black">Edify</span>
        </div>
      </div>

      <nav className="mt-4">
        <SidebarItem
          icon={<Telescope size={20} />}
          label="Explore"
          active={activePage === "explore"}
          onClick={() => handleNavigation("explore")}
        />
        <SidebarItem
          icon={<BookOpen size={20} />}
          label="My Courses"
          active={activePage === "courses"}
          onClick={() => handleNavigation("courses")}
        />
        <SidebarItem
          icon={<Users size={20} />}
          label="Students"
          active={activePage === "students"}
          onClick={() => handleNavigation("students")}
        />
        <SidebarItem
          icon={<ChartNoAxesCombined size={20} />}
          label="Analytics"
          active={activePage === "analytics"}
          onClick={() => handleNavigation("analytics")}
        />
      </nav>

      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 absolute bottom-4 ml-4"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 ${
      active ? "bg-gray-100 font-medium" : ""
    }`}
    onClick={onClick}
  >
    <span className="text-gray-500">{icon}</span>
    <span>{label}</span>
  </button>
);

export default InstructorSidebar;
