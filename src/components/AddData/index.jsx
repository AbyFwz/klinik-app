import React, { useState } from "react";
import ButtonIcon from "../Button/ButtonIcon";
import FormInput from "../FormInput";
import SelectOption from "../SelectOption";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import ButtonMain from "../Button/ButtonMain";
import { Time } from "../../data/Time";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";

export default function AddData({ columns }) {
  const tableInstance = useTable({
    columns,
  });

  const { headerGroups } = tableInstance;

  const [inputData, setInputData] = useState([{ name: "", treatment: "" }]);

  const handleAdd = () => {
    setInputData([...inputData, { name: "", treatment: "" }]);
  };

  const handleRemove = (i) => {
    const dataRow = [...inputData];
    dataRow.splice(i, 1);
    setInputData(dataRow);
  };

  const handleChange = (e) => {};

  return (
    <>
      <div id="header-container" className="flex flex-row justify-between">
        <div id="header-left" className="flex flex-col mb-4">
          <h1>
            Jadwal Pasien:<span className="text-blue-400"> Input</span>
          </h1>
          {/* TODO: props tanggal; add undo (use splice) */}
          {/* <p className="text-slate-700 align-baseline pt-2 text-sm">
            per 20 September 2022
          </p> */}
        </div>
        <div>
          <ButtonMain
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            text="Save Changes"
          />
        </div>
      </div>
      {/* select studio & doctor */}
      {/* <div className="bg-slate-50 rounded-lg h-24 mb-3 mt-5">
        <div className="flex flex-row py-5 px-6">
          
        </div>
      </div> */}

      {/* input table form */}

      <table className="table-auto w-full mt-4">
        {/* <thead className="px-6 py-3 text-left font-bold text-gray-900 bg-slate-50">
          <th>#</th>
          <th>Nama Pasien</th>
          <th>Treatment</th>
          <th className="w-32">Start Time</th>
          <th className="w-32">End Time</th>
          <th></th>
        </thead> */}

        <thead className="bg-sky-50">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="hover:bg-blue-50"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left font-medium text-gray-500"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* TODO: width of tds */}
        <tbody>
          {inputData.map((key, i) => (
            <tr key={i} className="pt-8 border-b-[1px] h-16 border-b-gray-300">
              <td className="font-bold w-1/12 pr-4 text-gray-500">{i + 1}</td>
              <td className="w-3/12">
                <FormInput placeholder="Name" />
              </td>
              <td className="w-3/12">
                <FormInput placeholder="Treatment" />
              </td>
              <td className="w-2/12">
                <SelectOption list={Time} />
              </td>
              <td className="w-2/12">
                <SelectOption list={Time} />
              </td>
              <td>
                {inputData.length !== 1 && (
                  <div className="w-1/12">
                    <ButtonIcon
                      bgColor="bg-red-500"
                      hoverColor="hover:bg-red-600"
                      onClick={() => handleRemove(i)}
                      icon={<BsFillTrashFill />}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* add data button */}
      <div>
        <div id="bottom-button-area" className="float-right mt-10">
          <button
            onClick={handleAdd}
            className="text-blue-400 hover:text-blue-500 hover:bg-blue-50 border border-blue-400 text-sm py-1 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none"
          >
            + Tambah Data
          </button>
        </div>
      </div>
    </>
  );
}
