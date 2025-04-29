// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { Origami } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-slate/80 backdrop-blur-xs py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Origami className="text-orange-500" />
            <span className="text-xl font-bold text-orange-500">Edify</span>
          </div>

          <div className=" md:flex items-center space-x-8">
            <Link to={"/login"}>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
