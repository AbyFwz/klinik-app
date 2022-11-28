import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { BiExport } from "react-icons/bi";
import { ButtonMain } from "../Button";

export default function ExportToExcel({ excelData, fileName }) {
  const fileType =
    "application/vn.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <ButtonMain
        bgColor="bg-green-400"
        hoverColor="hover:bg-green-500"
        text={`Export Data`}
        onClick={() => exportToExcel(fileName)}
        className={`bg-green-400 hover:bg-green-500 text-white text-sm py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none`}
      >
        <div className="flex flex-row">
          <span className="flex pt-[2px] pr-1">
            <BiExport />
          </span>
          Export
        </div>
      </ButtonMain>
    </>

    // https://www.youtube.com/watch?v=F7dQLO5Jhp4
  );
}
