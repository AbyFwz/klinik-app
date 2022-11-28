import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setShowProfileDropdown, setShowSidebar } from "../../redux/utilSlice";

export default function Header() {
  //TODO: dynamic photo, figure out a colour
  const { showSidebar, showProfileDropdown } = useSelector((state) => state.utils);
  

  const dispatch = useDispatch();

  return (
    <div className="flex justify-between w-full h-14 pt-2 pr-16 offset-x shadow-lg bg-slate-50">
      <button
        className="text-slate-900 text-lg pl-10"
        // this the issue all the time
        onClick={() => dispatch(setShowSidebar(!showSidebar))}
      >
        <HiMenu />
      </button>
      <div onClick={() => dispatch(setShowProfileDropdown(!showProfileDropdown))}>
        <img
          className="h-10 w-auto rounded-full cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzqAAhPmDrzEXoiqlmhstQQaxG3_lkJgvvh9zz-NyAEdpEBvqh-ZYcwM8LBKaGmwQbFw&usqp=CAU"
          alt="Profile Avatar"
        />
      </div>
    </div>
  );
}
