import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { useSelector } from "react-redux";
import ProfileDropdown from "../../components/ProfileDropdown";

export default function MainLayout({ children }) {
  const { showSidebar, showProfileDropdown } = useSelector(
    (state) => state.utils
  );

  let { isLoggedIn } = useSelector((state) => state.user);
  
  useEffect(() => {
    console.log(isLoggedIn);
  }, []);

  return (
    <div className="flex bg-gradient-to-tr from-slate-50 to-blue-50 h-screen">
      {showSidebar && <Sidebar />}

      <div className="flex-1 w-screen">
        <Header />
        {showProfileDropdown && <ProfileDropdown />}

        <div className="pt-14 pl-16 pr-16">{children}</div>
      </div>
    </div>
  );
}
