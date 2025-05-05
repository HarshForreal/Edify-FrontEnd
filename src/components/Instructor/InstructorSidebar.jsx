import React from "react";
import { Button } from "../ui/index";
import {
  LogOut,
  Telescope,
  ChartBar,
  Origami,
  Users,
  Bookmark,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const InstructorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

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

  return (
    <div className="w-60 border-r bg-white h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Origami className="text-black" />
          <span className="text-xl font-bold text-black">Edify</span>
        </div>
      </div>

      <nav className="mt-4 flex-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path} // Update active logic
            onClick={() => navigate(item.path)}
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
