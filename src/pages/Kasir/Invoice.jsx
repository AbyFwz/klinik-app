import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Transaksi } from '../../data/Transaksi';
import InvoicePrint from './InvoicePrint';
import KasirTable from './KasirTable';
import TableMetodePembayaran from './TableMetodePembayaran';

const Invoice = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  // useEffect(() => {
  //   handlePrint();
  // }, [handlePrint]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="bg-green-50 col-span-4 font-bold font-Inter text-center">
          Invoice Number
        </div>
        <div className="bg-green-50 col-span-2">
          Ruangan: <span className="font-bold">Studio 2</span>
        </div>
        <div className="bg-green-50 col-span-2 text-right">
          Tanggal: <span className="font-bold">28 September 2022</span>
        </div>

        <div className="col-span-4">
          <hr />
        </div>

        <div className="bg-green-50">
          <div className="pr-4">
            <label className="block mb-1 text-gray-900">Nama Pasien</label>
            <div>
              <input
                type="text"
                className="w-auto h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block py-2 px-3"
                value="Jessica Josephine"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="bg-green-50">
          <div className="pr-4">
            <label className="block mb-1 text-gray-900">Jenis Tindakan</label>
            <div>
              <input
                type="text"
                className="w-auto h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block py-2 px-3"
                value="Orthodontics"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="bg-green-50">
          <div className="pr-4">
            <label className="block mb-1 text-gray-900">Jam Mulai</label>
            <div>
              <input
                type="text"
                className="w-24 h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block py-2 px-3"
                value="18:00"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="bg-green-50">
          <div className="pr-4">
            <label className="block mb-1 text-gray-900">Jam Selesai</label>
            <div>
              <input
                type="text"
                className="w-24 h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block py-2 px-3"
                value="18:30"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="bg-green-50 col-span-4">
          <KasirTable transaksi={Transaksi} />
        </div>

        {/* <div className="grid grid-rows-4 gap-2"></div> */}
        <div className="bg-green-50 col-span-2">
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
        <div className="bg-green-50 col-span-2">
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

        <div className="bg-green-50 col-span-2">
          <TableMetodePembayaran />
        </div>
      </div>

      <div className="col-span-2 float-right">
        <button className="bg-red-300 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300" onClick={handlePrint}>
          Cetak Nota
        </button>
      </div>

      <div style={{ display: 'none' }}>
        <InvoicePrint ref={componentRef} />
      </div>
    </>
  );
}

export default Invoice