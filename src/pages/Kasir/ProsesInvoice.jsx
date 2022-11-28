import React from "react";
import { ButtonMain } from "../../components/Button";
import KasirTable from "./KasirTable";
import { Transaksi } from "../../data/Transaksi";
import { useNavigate } from "react-router-dom";
import Container from "../../layouts/Container";

export default function ProsesInvoice() {
  const navigate = useNavigate();
  return (
    <div>
      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <h1>Proses Invoice</h1>
        </div>
        <div>
          <ButtonMain
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            text="Pembayaran"
            onClick={() => {
              navigate("/pembayaran");
            }}
          />
          <ButtonMain
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            text="Ubah Invoice"
            onClick={() => {
              navigate("/ubah-invoice");
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <Container>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 font-bold font-Inter text-center">
              Detail Transaksi
            </div>
            <div className="col-span-2">
              Ruangan: <span className="font-bold">Studio 2</span>
            </div>
            <div className="col-span-2 text-right">
              Tanggal: <span className="font-bold">28 September 2022</span>
            </div>

            <div className="col-span-4">
              <hr />
            </div>

            <div className="">
              <div className="pr-4">
                <label className="block mb-1 text-gray-900">Nama Pasien</label>
                <div>
                  <input
                    type="text"
                    className="w-auto h-8 bg-white border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg block py-2 px-3"
                    value="Jessica Josephine"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="pr-4">
                <label className="block mb-1 text-gray-900">
                  Jenis Tindakan
                </label>
                <div>
                  <input
                    type="text"
                    className="w-auto h-8 bg-white border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg block py-2 px-3"
                    value="Orthodontics"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="pr-4">
                <label className="block mb-1 text-gray-900">Jam Mulai</label>
                <div>
                  <input
                    type="text"
                    className="w-24 h-8 bg-green-300 border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg block py-2 px-3"
                    value="18:00"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="pr-4">
                <label className="block mb-1  text-gray-900">Jam Selesai</label>
                <div>
                  <input
                    type="text"
                    className="w-24 h-8 bg-red-300 border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg block py-2 px-3"
                    value="18:30"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4 mt-3 mb-3">
              <KasirTable transaksi={Transaksi} />
            </div>

        
              <div className="col-span-2 mt-8">
                <div className="pr-4">
                  <label className="block mb-1 text-gray-900">Keterangan</label>
                  <div>
                    <textarea
                      type="text"
                      className="w-full h-fit bg-white border border-gray-300 text-gray-900 rounded-lg block py-2 px-3"
                      value="Jadwal kontrol 3 minggu lagi; BY"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 mt-12">
                <div className="flex flex-row justify-between">
                  Grand Total <span className="font-bold">Rp.2.000.000</span>
                </div>
                <div className="flex flex-row justify-between">
                  Bayar <span className="font-bold">Rp.2.000.000</span>
                </div>
                <div className="flex flex-row justify-between">
                  Kembali <span className="font-bold">Rp.0</span>
                </div>
              </div>
            </div>
        </Container>
      </div>
    </div>
  );
}
