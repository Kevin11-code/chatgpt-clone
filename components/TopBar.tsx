"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";

type Props = {
  toggleSidebar: () => void;
};

function TopBar({ toggleSidebar }: Props) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const confirmDialogRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      
      if (confirmDialogRef.current && !confirmDialogRef.current.contains(event.target as Node)) {
        setShowSignOutConfirm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, confirmDialogRef]);

  const initiateSignOut = () => {
    setShowSignOutConfirm(true);
  };
  
  const handleSignOut = () => {
    setShowSignOutConfirm(false);
    setDropdownOpen(false);
    signOut();
  };
  
  const cancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  return (
    <div className="bg-[#0a0a0a] border-b border-[#2a2a2a] py-2.5 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-white p-1 rounded hover:bg-[#2a2a2a] transition-colors"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="flex items-center ml-2 md:ml-0">
          <div className="h-7 w-7 bg-[#10a37f] rounded-sm flex items-center justify-center text-white mr-2">
            <svg width="16" height="16" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" className="h-5 w-5">
              <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="font-semibold text-white text-lg tracking-tight">ChatAI</h1>
        </div>
      </div>
      
      {session && (
        <div className="flex items-center space-x-3">
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
              aria-label="User menu"
              aria-haspopup="true"
            >
              <img
                src={session.user?.image!}
                alt="Profile"
                className={`h-8 w-8 rounded-full cursor-pointer border transition-all duration-200 
                  ${dropdownOpen ? 'border-[#10a37f] shadow-md' : 'border-[#2a2a2a]'} 
                  hover:border-[#10a37f] hover:shadow-lg transform hover:scale-105`}
              />
            </button>
              {/* Dropdown menu */}
            <div 
              className={`absolute right-0 mt-2 w-64 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md shadow-lg overflow-hidden z-50
                ${dropdownOpen 
                  ? 'dropdown-open' 
                  : 'dropdown-closed pointer-events-none'}`}
            >              {/* Profile Section */}
              <div className="px-4 py-4 border-b border-[#2a2a2a] bg-[#0c0c0c]">
                <div className="flex items-center space-x-3">
                  <img
                    src={session.user?.image!}
                    alt="Profile"
                    className="h-12 w-12 rounded-full border-2 border-[#10a37f] shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate mb-0.5">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#2a2a2a] transition-colors"
                >
                  {/* Logout icon */}
                  <div className="h-6 w-6 rounded-full bg-[#1e1e1e] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
