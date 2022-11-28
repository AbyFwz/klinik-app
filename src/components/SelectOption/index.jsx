import React from "react";

export default function SelectOption(props) {
  // how to know which key you are displaying during mapping
  // value data is an id of sorts dan isi option should be {data.name}

  let list = props.list;

  return (
    <div>
      <label
        htmlFor={`label-${props.text}`}
        className="block mb-2 text-sm font-bold text-gray-900"
      >
        {props.text}
      </label>
        <select
        id={props.text}
        className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-max px-4"
      >
        <option disabled={true} value="">
          --
        </option>
        {list.map((data, i) => (
          <option key={i} value={data} className="text-sm">
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
