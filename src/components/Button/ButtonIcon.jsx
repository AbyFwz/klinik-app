import React from "react";

export default function ButtonIcon(props) {
  return (
    <button
      className={`${props.bgColor} ${props.hoverColor} text-white text-sm font-bold py-1 px-2 md:py-2 lg:py-2 md:px-4 lg:px-4 rounded-full mr-1`}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
