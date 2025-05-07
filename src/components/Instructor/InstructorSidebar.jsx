import React, { useState } from "react";
import { Button } from "../ui/index";
import {
  LogOut,
  Telescope,
  ChartBar,
  Users,
  Bookmark,
  X,
  Menu, // Import Menu icon for toggle
  Plus,
  Origami, // Added Plus icon for responsive button
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const InstructorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <Bookmark size={20} />,
      path: "/instructor-dashboard",
    },
    {
      label: "Explore",
      icon: <Telescope size={20} />,
      path: "/instructor-dashboard/explore",
    },
    {
      label: "Students",
      icon: <Users size={20} />,
      path: "/instructor-dashboard/students",
    },
    {
      label: "Analytics",
      icon: <ChartBar size={20} />,
      path: "/instructor-dashboard/analytics",
    },
  ];

  const handleNewCourse = () => {
    console.log("New course button clicked");
  };

  return (
    <div className="relative flex h-full">
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-60" : ""
        }`}
      >
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-md p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? null : <Menu size={20} />}
        </button>

        <div className="h-16 md:h-0"></div>

        <div className="absolute top-4 right-4">
          <Button
            onClick={handleNewCourse}
            className="bg-black text-white rounded-md px-3 py-2 flex items-center gap-1"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Course</span>
          </Button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-blur-50 bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`w-72 bg-white h-full flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:relative md:z-10`}
      >
        <div className="flex items-center p-4 border-b ">
          <button
            className="md:hidden mr-2"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          <span className="text-xl font-bold">Edify</span>
        </div>

        <nav className="flex-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
            />
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center gap-3 w-full px-6 py-4 text-left text-sm hover:bg-gray-50 ${
      active ? "bg-gray-100 font-semibold" : ""
    }`}
    onClick={onClick}
  >
    <span className={`${active ? "text-black" : "text-gray-500"}`}>{icon}</span>
    <span className={`${active ? "text-black" : "text-gray-800"}`}>
      {label}
    </span>
  </button>
);

export default InstructorSidebar;
