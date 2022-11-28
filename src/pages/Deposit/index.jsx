import React, { useMemo } from "react";
import { useEffect } from "react";
import { ButtonIcon, ButtonMain } from "../../components/Button";
import Table from "../../components/Table";
import Patients from "../../data/DummyPasien.json";
import { BsPencilFill } from "react-icons/bs";

export default function Deposit() {
  const patientData = Patients;


  const cols = [
    {
      Header: "No.",
      Cell: (row) => {
        return <div>{Number(row.row.index + 1)}</div>;
      },
    },
    {
      Header: "Nama Pasien",
      accessor: "full_name",
    },
    {
      Header: "Tanggal",
      accessor: "deposit[0].tanggal",
    },
    {
      Header: "Keterangan",
      accessor: "deposit[0].keterangan",
    },
    {
      Header: "Saldo Deposit",
      accessor: "deposit[0].jumlah",
      className: "font-semibold"
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <>
          <div>
            <ButtonIcon
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={() => {
                console.log("edit");
              }}
              icon={<BsPencilFill />}
            />
          </div>
        </>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => patientData, []);

  return (
    <>
      <div className="mb-5">
        <h1>Deposit</h1>
        <p>Daftar pasien yang memiliki deposit</p>
      </div>

      <div className="flex flex-row">
        <ButtonMain
          text={`+ Tambah Data Baru`}
          bgColor="bg-blue-400"
          hoverColor="hover:bg-blue-500"
        />
      </div>

      <div>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
}
