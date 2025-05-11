"use client";

import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

function TopBarContainer() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <TopBar toggleSidebar={toggleSidebar} />
      
      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setShowMobileSidebar(false)}
          ></div>
          <div className="fixed top-[44px] left-0 bottom-0 z-30 w-[260px] bg-[#121212] md:hidden border-r border-[#2a2a2a]">
            <SideBar />
          </div>
        </>
      )}
    </>
  );
}

export default TopBarContainer;
