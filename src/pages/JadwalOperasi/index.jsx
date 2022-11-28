import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
// components, data, slices
import Table from "../../components/Table";
import {
  ButtonIcon,
  ButtonMain,
  ButtonTextIcon,
} from "../../components/Button";
import ExportToExcel from "../../components/ExportToExcel";
import DeleteModal from "../../components/DeleteModal";
import JadwalService from "../../services/JadwalService";
import SelectStatus from "../../components/SelectStatus";
import SelectDate from "../../components/SelectDate";
import MessageModal from "./MessageModal";
import TableContentLoader from "../../components/TableContentLoader";
import UbahStatus from "./UbahStatus";

export default function JadwalOperasi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    JadwalService.getAll().then((res) => {
      setJadwal(res);
      setLoading(true);
    });
  }, []);

  const [jadwal, setJadwal] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);

  const [deleteIndex, setDeleteIndex] = useState(0);

  const handleCloseUpdate = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleCloseMessage = () => {
    setShowMessageModal(!showMessageModal);
  };

  const handleCloseChangeStatus = () => {
    setShowChangeStatus(!showChangeStatus);
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
      Header: "Dokter",
      accessor: "dokter",
    },
    {
      Header: "Ruangan",
      accessor: "ruangan",
    },
    {
      Header: "Jam Selesai",
      accessor: "jam",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        return value === "Belum datang" ? (
          <div className="bg-red-400 text-sm text-white font-semibold w-max px-2 rounded-lg">
            {value}
          </div>
        ) : value === "Sedang Berlangsung" ? (
          <div className="bg-blue-400 text-sm text-white font-semibold w-max px-2 rounded-lg">
            {value}
          </div>
        ) : value === "Cancelled" ? (
          <div className="bg-slate-400 text-white text-sm font-semibold w-max px-2 rounded-lg">
            {value}
          </div>
        ) : (
          <div className="bg-green-400 text-white text-sm font-semibold w-max px-2 rounded-lg">
            {value}
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <>
          <div className="flex flex-row z-100">
            <ButtonIcon
              bgColor="bg-slate-400"
              hoverColor="hover:bg-slate-500"
              onClick={() => {
                setShowUpdateModal(!showUpdateModal);
              }}
              icon={<BsPencilFill />}
            />
            <ButtonIcon
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={() => {
                setShowDeleteModal(true);
                showDeleteModal && setDeleteIndex(i);
              }}
              icon={<BsFillTrashFill />}
            />
            <div>
              <ButtonIcon
                bgColor="bg-purple-400"
                hoverColor="hover:bg-purple-500"
                onClick={() => {
                  console.log("Ubah Status !!!");
                  setShowChangeStatus(true);
                }}
                icon={<FiRefreshCcw />}
              />
            </div>
          </div>
        </>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, []);
  const data = useMemo(() => jadwal, [jadwal]);

  return (
    <>
      <div className="mb-12">
        <h1>
          Jadwal Operasi:
        </h1>
        <p>Jadwal Operasi Jumat, 20 November 2022</p>
      </div>
      <div className="flex flex-row">
        <div className="mr-2">
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
        <div>
          <ButtonMain
            text={`Salin Jadwal`}
            bgColor="bg-blue-400"
            onClick={() => {
              console.log("Salin jadwal");
              console.log(jadwal);
              setShowMessageModal(true);
            }}
          />
        </div>
      </div>

      {!loading ? (
        <TableContentLoader />
      ) : (
        <Table columns={columns} data={data} />
      )}

      {/* 
      {showUpdateModal && (
        <EditDokter
          handleClose={handleCloseUpdate}
          columns={columns}
          selectedValue={editValues}
          toUpdate={toUpdate}
        />
      )} */}

      {showDeleteModal && (
        <DeleteModal
          handleClose={handleCloseDelete}
          handleDelete={handleDelete(deleteIndex)}
        />
      )}

      {showMessageModal && (
        <MessageModal handleClose={handleCloseMessage} jadwalList={jadwal} />
      )}

      {showChangeStatus && <UbahStatus handleClose={handleCloseChangeStatus} />}
    </>
  );
}
