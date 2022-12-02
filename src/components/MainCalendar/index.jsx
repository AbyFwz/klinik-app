import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import JadwalService from '../../services/JadwalService';

export default function MainCalendar() {
  useEffect(() => {
    JadwalService.getAll().then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.err(err);
    });
  }, []);
  
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[]}
      />
    </div>
  );
}
