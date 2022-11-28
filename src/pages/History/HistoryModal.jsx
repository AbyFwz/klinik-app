import React from "react";
import { ButtonMain} from "../../components/Button";
export default function HistoryModal({ handleClose, historyData }) {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl">
        <h3 className="text-center text-xl font-Inter font-bold text-main-blue mb-8">
          {historyData[0].id_transaksi}
        </h3>
        <div id="content" className="flex flex-col justify-center">
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Tanggal:</p>
            <p className="w-44">{historyData[0].tanggal}</p>
          </div>
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 flex flex-wrap text-slate-500">
              Dokter yang menangani:
            </p>
            <p className="w-44 flex flex-wrap">{historyData[0].dokter}</p>
          </div>
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Tindakan:</p>
            <p className="w-44">{historyData[0].tindakan}</p>
          </div>
          
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Total Biaya Tindakan:</p>
            <p className="w-44">{historyData[0].total}</p>
          </div>
          {/* TODO: diskon */}
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Add diskon nanti!</p>
            <p className="w-44">-</p>
          </div>
          <div className="flex flex-row justify-between pb-2">
            <p className="w-24 mr-8 text-slate-500">Status:</p>
            <p className={`w-44 font-bold ${historyData[0].status === `Lunas` ? `text-green-500` : `text-red-500`}`}>{historyData[0].status}</p>
          </div>
          <div className="flex flex-col pb-2 pt-2 border-t border-t-slate-100">
            <p className="w-24 mr-8 text-slate-500">Keterangan:</p>
            <p className="w-44">{historyData[0].keterangan}</p>
          </div>
        </div>

        <div className="float-right mt-4">
          <ButtonMain
            text="Close"
            hoverColor="hover:bg-blue-500"
            bgColor="bg-blue-400"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
