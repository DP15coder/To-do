import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  console.log(user,"what is inside a user");
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">TodoMaster</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
