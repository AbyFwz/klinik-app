import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { AiOutlineSearch } from "react-icons/ai";

export default function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span className="z-1">
      <div
        id="search-container"
        className="w-72"
      >
        <span className="flex absolute text-left align-middle py-1 pl-2 mt-1">
          <AiOutlineSearch />
        </span>
        <input
          value={value || ""}
          placeholder="Search"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className="border border-slate-300 h-8 pl-8 rounded-full focus:ring-2 focus:outline-none focus:ring-blue-400"
        />
      </div>
    </span>
  );
}
