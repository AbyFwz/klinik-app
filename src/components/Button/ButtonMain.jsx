import React from "react";

export default function ButtonMain(props) {
  return (
    <button
      type={props.buttonType}
      onClick={props.onClick}
      className={`${props.bgColor} ${props.hoverColor} text-white text-sm py-2 px-4 mr-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none`}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
