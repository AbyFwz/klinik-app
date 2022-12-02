import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { ButtonMain, ButtonIcon } from "../../components/Button";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";

const AddJadwal = () => {
  const initForm = {
    namaL: null,
    tindakan: null,
    dokter: null,
    ruangan: null,
    start: null,
    end: null,
  };

  // Data Needed
  const now = new Date();
  const [date, setDate] = useState(moment(now).format("YYYY/MM/DD"));
  const [tempData, setTempData] = useState([initForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleAddRow = () => {
    setTempData([...tempData, initForm]);
  };

  return (
    <div>
      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <h1>
            Jadwal Operasi: <span className="text-blue-400">Input</span>
          </h1>
        </div>
        <div>
          <button
            onClick={handleAddRow}
            className="text-blue-400 hover:text-blue-500 hover:bg-blue-50 border border-blue-400 text-sm py-1 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none"
          >
            + Tambah Data
          </button>
        </div>
      </div>

      {/* input table form */}
      <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="max-w-sm w-full lg:max-w-full overflow-hidden shadow-lg rounded-lg bg-indigo-200">
        <div className="px-6 pt-4 pb-4">
          <div className="grid grid-rows-2 grid-flow-col gap-2">
            <div className="grid grid-cols-2 grid-flow-col gap-2">
              <div>Ruangan : </div>
              <div>Dokter : </div>
            </div>
            <div className="grid grid-cols-2 grid-flow-col gap-2">
            {tempData.map((val, idx) => {
              return (
                <>
                  <div><FormSelect data="ruangan" name={`ruangan_${idx}`} /></div>
                  <div><FormSelect data="dokter" name={`dokter_${idx}`} /></div>
                </>
                );
            })}
            </div>
          </div>
        </div>
      </div>
        {/* <FormInput
          name="tanggal"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /> */}
        <table className="table-auto w-full mt-4">
          <thead className="px-6 py-3 text-left font-bold text-gray-900 bg-slate-50">
            <tr>
              <th>No</th>
              <th>Nama Pasien</th>
              <th>Jenis Tindakan</th>
              <th>Keterangan Perawatan</th>
              {/* <th>Dokter</th>
              <th>Ruangan</th> */}
              <th>Waktu Operasi</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {tempData.map((val, idx) => {
              return (
                <tr
                  className="pt-8 border-b-[1px] h-16 border-b-gray-300"
                  key={idx}
                >
                  {/* <td className="font-bold w-1/13 pr-4 text-gray-500"></td> */}
                  <td className="w-1/12">{idx + 1}</td>
                  <td className="w-2/12">
                    <FormInput placeholder="Name Lengkap" name={`nama_${idx}`} />
                  </td>
                  <td className="w-2/12">
                    <FormSelect data="jenis_tindakan" name={`jenis_tindakan_${idx}`} />
                  </td>
                  <td className="w-2/12">
                    <FormInput name={`nama_${idx}`} />
                  </td>
                  {/* <td className="w-2/12">
                    <FormSelect data="dokter" name={`dokter_${idx}`} />
                  </td>
                  <td className="w-2/12">
                    <FormSelect data="ruangan" name={`ruangan_${idx}`} />
                  </td> */}
                  <td className="w-2/12">
                    <tr>
                      <td className="w-1/3">
                        <FormInput
                          placeholder="Waktu Mulai Operasi"
                          name={`start_${idx}`}
                          type="time"
                        />
                      </td>
                      <td className="w-1/3">
                        <span>to</span>
                      </td>
                      <td className="w-1/3">
                        <FormInput
                          placeholder="Waktu Selesai Operasi"
                          name={`end_${idx}`}
                          type="time"
                        />
                      </td>
                    </tr>
                  </td>
                  <td className="w-2/12">
                    <ButtonIcon
                      bgColor="bg-slate-400"
                      hoverColor="hover:bg-slate-500"
                      // onClick={() => {
                      //   setShowUpdateModal(true);
                      //   console.log(row.row.values.id);
                      //   getJenisTindakan(row.row.values.id);
                      // }}
                      icon={<BsPencilFill />}
                    />
                    <ButtonIcon
                      bgColor="bg-red-400"
                      hoverColor="hover:bg-red-500"
                      // onClick={() => {
                      //   setShowDeleteModal(true);
                      //   setSelectedIndex(row.row.values.id);
                      // }}
                      icon={<BsFillTrashFill />}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* add data button */}
        <div id="bottom-button-area" className="float-right mt-10">
          <ButtonMain
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            text="Save Changes"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddJadwal;
