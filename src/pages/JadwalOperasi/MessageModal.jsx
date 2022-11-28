import React from "react";
import { ButtonMain, ButtonOutline } from "../../components/Button";

export default function MessageModal({ handleClose, jadwalList }) {
  const handleCopy = () => {
    console.log("copying...");
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl w-max">
        <h3 className="text-center text-xl font-Inter font-bold text-main-blue mb-4">
          Jadwal Operasi, {"[Tanggal]"}
        </h3>
        <div id="message" className="flex-grow h-56 overflow-y-auto my-8 w-96">
          <p className="font-semibold">Selamat malam,</p>
          {/* TODO: order by studio and dokter */}
          {jadwalList.map((jadwal, id) => (
            <div key={id}>
              <h4>{jadwal.ruangan}</h4> 
              <h4>{jadwal.dokter}</h4> 
              <p>{jadwal.nama} | {jadwal.tindakan} | {jadwal.jam} </p>
              <br/>
            </div>
          ))}
          <p>FO pagi:</p>
          <p>FO siang:</p>
          <p className="mb-2">Terima kasih</p>
        </div>
        <div className="flex flex-row float-right">
          <ButtonOutline
            text="Close"
            hoverColor="hover:bg-slate-50"
            textColor="text-red-400"
            borderColor="border-red-400"
            onClick={handleClose}
          />

          <ButtonMain
            text="Salin Jadwal"
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
