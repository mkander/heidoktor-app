import React from 'react';
import { Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Heart className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">HeiDoktor</span>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Hjem</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Om oss</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Tjenester</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Kontakt</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;