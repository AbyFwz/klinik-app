import React from "react";

export default function SelectStatus({value}) {
  const status = [
    { id: 1, name: "Belum datang" },
    { id: 2, name: "Menunggu" },
    { id: 3, name: "Sedang berlangsung" },
    { id: 4, name: "Cancelled" },
  ];
  return (
    <div>
      <select
        className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-sky-500 focus:border-sky-500 block w-full px-2"
      >
        {status.map((data, i) => (
          <option
            key={i}
      
            defaultValue={value}
            // className={`text-sm ${data.id === 1 ? `bg-red-400` : `bg-sky-400`}`}
          >
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
}
