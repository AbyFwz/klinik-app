import React from "react";
import { ButtonMain } from "../Button";
import FormInput from "../FormInput";

// sample layout
export default function UpdateData() {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl">
        <div className="flex justify-between items-start rounded border-b dark:border-gray-600">
          <h3 className="text-xl font-Inter font-bold text-main-blue">
            Update Data
          </h3>
          
        </div>
        <div className="my-4"><FormInput text="Label"/></div>
        <div>
          <ButtonMain
            text="Close"
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            onClick={()=> {}}
          />
        </div>
      </div>
    </div>
  );
}
