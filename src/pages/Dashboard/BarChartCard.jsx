import React, { useState } from "react";
import BarChart from "../../components/BarChart";
import { PatientVisit } from "../../data/Charts";

export default function BarChartCard() {
  const [patientVisitData, setPatientVisitData] = useState({
    labels: PatientVisit.map((data) => data.month),
    datasets: [
      {
        label: "Patients Visited",
        data: PatientVisit.map((data) => data.patients),
        backgroundColor: ["#bfdbfe"],
      },
    ],
  });
  return (
    <div>
      <p className="font-bold text-xl mt-8">Pasien per bulan:</p>
      <p className="text-gray-500 mb-4">
        Jumlah pasien per bulan.
      </p>
      <div className="bg-white shadow-lg rounded-2xl p-5">
        <BarChart chartData={patientVisitData} />
      </div>
    </div>
  );
}
