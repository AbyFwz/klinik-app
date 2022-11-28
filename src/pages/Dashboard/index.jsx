import React, { useState } from "react";
import BarChartCard from "./BarChartCard";
import PieChartCard from "./PieChartCard";
import ToDoCard from "./ToDoCard";
import Card from "../../components/Card";
import CardsArea from "./CardsArea";
import MainCalendar from "../../components/MainCalendar";
import VerticalCards from "./VerticalCards";
import OverviewArea from "./OverviewArea";

export default function Dashboard() {
  const [updateData, setUpdateData] = useState(false);
  return (
    <div>
      <h1 className="mb-12">Welcome Home</h1>

      <div className="flex flex-col md:flex-row lg:flex-row mb-3">
        <OverviewArea />
        <ToDoCard />
      </div>
      <div>
        <p className="font-bold text-xl mt-8">Jadwal Operasi:</p>
        <p className="text-gray-500 mb-4">Overview dari jadwal pasien</p>
        <div className="bg-white shadow-lg rounded-2xl p-5">
          <MainCalendar />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-6/12 h-auto">
          <PieChartCard />
        </div>
        <div className="w-6/12 h-auto">
          <BarChartCard />
        </div>
      </div>
    </div>
  );
}
