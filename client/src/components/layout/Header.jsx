import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut, CheckSquare } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-blue-700 shadow-sm border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-8 h-8 text-white" />
            <h1 className="text-xl font-bold text-white">TodoMaster</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">Welcome</span>
            <span className="text-sm text-white font-bold">{user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:bg-blue-800 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
