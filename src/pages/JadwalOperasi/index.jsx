import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
// components, data, slices
import Table from "../../components/Table";
import { ButtonIcon, ButtonMain } from "../../components/Button";
import ExportToExcel from "../../components/ExportToExcel";
import DeleteModal from "../../components/DeleteModal";
import JadwalService from "../../services/JadwalService";
import MessageModal from "./MessageModal";
import TableContentLoader from "../../components/TableContentLoader";
import UbahStatus from "./UbahStatus";
import moment from "moment";
import FormInput from "../../components/FormInput";
import DokterService from "../../services/DokterService";
import JenisTindakanService from "../../services/JenisTindakanService";
import RuanganService from "../../services/RuanganService";

export default function JadwalOperasi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [jadwal, setJadwal] = useState([]);

  const [tempJadwal, setTempJadwal] = useState([]);
  const [dokter, setDokter] = useState([]);
  const [tindakan, setTindakan] = useState([]);
  const [ruangan, setRuangan] = useState([]);

  useEffect(() => {
    JadwalService.getAll().then((res) => {
      res.map((val) => {
        DokterService.get(val.dokter).then((res) => {
          setDokter((dokter) => [...dokter, res.data.nama]);
        });
        JenisTindakanService.get(val.tindakan).then((res) => {
          setTindakan((tindakan) => [...tindakan, res.data.nama]);
        });
        RuanganService.get(val.ruangan).then((res) => {
          setRuangan((ruangan) => [...ruangan, res.data.nama]);
        });

        setTempJadwal([...tempJadwal, val]);
      });
      setIsMounted(true);
      setJadwal([]);
    });
  }, []);

  useEffect(() => {
    tempJadwal.map((val, idx) => {
      if (
        dokter[idx] != undefined &&
        tindakan[idx] != undefined &&
        ruangan[idx] != undefined
      ) {
        let temp = {
          id: val.id,
          nama: val.nama,
          tindakan: tindakan[idx],
          dokter: dokter[idx],
          ruangan: ruangan[idx],
          jam: `${val.start}-${val.end}`,
          status: val.status,
        };
        setJadwal([...jadwal, temp]);
        setLoading(true);
      }
    });
  }, [isMounted, dokter, tindakan, ruangan]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);

  const [date, setDate] = useState(moment(new Date()).format("YYYY/MM/DD"));
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

  const handleDelete = (i) => {
    JadwalService.removeData(i)
      .then((resp) => {
        handleCloseDelete();
        navigate(0);
      })
      .catch((err) => {
        console.warn(err);
        handleCloseDelete();
      });
  };

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
                console.log(row)
                setShowDeleteModal(true);
                setDeleteIndex(row.id);
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
        <h1>Jadwal Operasi:</h1>
        <p>Jadwal Operasi Jumat, 20 November 2022</p>
      </div>
      <div className="flex flex-row">
        <div className="mr-2">
          <FormInput name="date" type="date" onChange={(e) => setDate(e)} />
        </div>

        <ButtonMain
          text={`+ Add Jadwal`}
          bgColor="bg-blue-400"
          onClick={() => navigate("/add-jadwal", { state: date })}
        />
        <div>
          <ExportToExcel excelData={data} fileName="Jadwal_Operasi" />
        </div>
        <div>
          <ButtonMain
            text={`Salin Jadwal`}
            bgColor="bg-blue-400"
            onClick={() => {
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
