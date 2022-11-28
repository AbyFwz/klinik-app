import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

export default function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="absolute right-12 mt-5 mr-3 px-5 py-2 bg-white rounded-md shadow-lg overflow-hidden z-20 duration-100">
      <div className="px-4 py-3 hover:bg-gray-100 border-b-[1px]  border-slate-300">
        <p className="text-sm font-bold">Admin (User)</p>
      </div>
      <div className="px-4 py-3 hover:bg-gray-100">
        <p onClick={handleLogout} className="text-sm text-gray-600 cursor-pointer">Logout</p>
        {/* <Link onClick={handleLogout} to="/" className="text-gray-600 text-sm">Logout</Link> */}
      </div>
    </div>
  );
}
