import React, { useState } from "react";
import PieChart from "../../components/PieChart";
import { ByDepartment } from "../../data/Charts";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";

export default function PieChartCard() {
  // TODO: last, map colors
  const [patientVisitData, setPatientVisitData] = useState({
    labels: ByDepartment.map((data) => data.treatment),
    datasets: [
      {
        label: "Patients Visited",
        data: ByDepartment.map((data) => data.patients),
        backgroundColor: [
          "#e9d5ff",
          "#fed7aa",
          "#dbeafe",
          "#dcfce7",
          "#fef3c7",
        ],
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };
  return (
    <div>
      <p className="font-bold text-xl mt-8">Pasien per jenis tindakan:</p>
      <p className="text-gray-500 mb-4">
        Jumlah pasien berdasarkan jenis tindakan bulan ini
      </p>
      <div className="bg-white shadow-lg rounded-2xl p-5 w-full">
        <div className="">
          <PieChart chartData={patientVisitData} options={options} />
        </div>
      </div>
    </div>
  );
}
