import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsPencilFill, BsCash } from "react-icons/bs";
// components, data, slices
import Table from "../../components/Table";
import {
  ButtonMain,
  ButtonTextIcon,
} from "../../components/Button";
import ExportToExcel from "../../components/ExportToExcel";
import KasirService from "../../services/KasirService";
import SelectDate from "../../components/SelectDate";

export default function Kasir() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    KasirService.getAll().then((res) => {
      setJadwal(res);
    });
  }, []);

  const [jadwal, setJadwal] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const [toUpdate, setToUpdate] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(0);

  const handleCloseUpdate = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = (i) => {};

  const cols = [
    {
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Tindakan",
      accessor: "tindakan",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        return value === "Belum Lunas" ? (
          <div className="bg-red-400 text-sm text-white font-semibold w-max px-2 rounded-lg">
            {value}
          </div>
        ) : (
          <div className="bg-green-400 text-sm text-white font-semibold w-max px-2 rounded-lg">
            {value}
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <div className="flex flex-row z-100">
          <div>
            <ButtonTextIcon
              bgColor="bg-slate-400"
              hoverColor="hover:bg-slate-500"
              text="Edit Transaksi"
              onClick={() => {
                setShowUpdateModal(!showUpdateModal);
              }}
              icon={<BsPencilFill />}
            />
          </div>

          <ButtonTextIcon
            text="Proses"
            bgColor="bg-purple-400"
            hoverColor="hover:bg-purple-500"
            onClick={() => {
                navigate("/proses-invoice");
            }}
            icon={<BsCash />}
          />
        </div>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, []);
  const data = useMemo(() => jadwal, [jadwal]);

  return (
    <>
      <div className="mb-5">
        <h1>
          Kasir: <span className="text-blue-500">Jumat, 20 November 2022</span>
        </h1>
        <p>Pengasiran Pasien Jumat, 20 November 2022</p>
      </div>
      <div className="flex flex-row">
        <div className="mr-3">
          <SelectDate />
        </div>

        <ButtonMain
          text={`+ Add Jadwal`}
          bgColor="bg-blue-400"
          onClick={() => navigate("/add-dokter")}
        />
        <div>
          <ExportToExcel excelData={data} fileName="Jadwal_Operasi" />
        </div>

      </div>
      <Table columns={columns} data={data} />
    </>
  );
}
