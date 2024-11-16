import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black/50 backdrop-blur-sm p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2 cursor-pointer">
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wider">
              ImposterSOS
            </h1>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider">
              Beta
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-white text-center">
              <li className="hover:text-gray-200 cursor-pointer transition">
                <a href="/">Play</a>
              </li>
              <li className="hover:text-gray-200 cursor-pointer transition">
                <a href="/about">How To Play</a>
              </li>
            </ul>
          </nav>
          
          <div className="md:ml-6">
            <DynamicWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
