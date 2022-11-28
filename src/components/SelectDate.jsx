import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SelectDate() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        className="border border-slate-400 rounded-lg w-44 px-2"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollbaleMonthYearDropdown
      />
    </div>
  );
}
