import React, { useState, useMemo, useEffect } from "react";
// third-party
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
// components, data, slices
import Table from "../../../components/Table";
import { ButtonIcon, ButtonMain } from "../../../components/Button";
import EditDokter from "./edit";
import ExportToExcel from "../../../components/ExportToExcel";
import DokterService from "../../../services/DokterService";
import DeleteModal from "../../../components/DeleteModal";
import TableContentLoader from "../../../components/TableContentLoader";
import {
  getAll,
  getDokter,
  deleteDokter,
  setDokter,
  setSelectedData,
} from "../../../redux/dokterSlice";

export default function ViewDokter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dokter, loading } = useSelector((state) => state.dokter);
  // const {dokter, loading} = useSelector((state) => ({...state.dokter}));

  // const [dokter, setDokter] = useState();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    DokterService.getAll().then((res) => {
      dispatch(setDokter(res))
    });
  }, [loading]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const [toUpdate, setToUpdate] = useState({});

  const [index, setIndex] = useState();

  const handleCloseUpdate = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = (i) => {
    DokterService.removeData(i)
      .then((resp) => {
        handleCloseDelete();
        navigate(0);
      })
      .catch((err) => {
        console.warn(err);
        handleCloseDelete();
        navigate(0);
      });
  };

  const getDokter = (id) => {
    DokterService.get(id)
      .then((res) => {
        dispatch(setSelectedData(res.data));
      })
      .catch((e) => console.log(`Error: ${e}`));
  };

  const cols = [
    {
      Header: "No.",
      accessor: "id",
    },
    {
      Header: "Nama",
      accessor: "nama",
    },
    {
      Header: "Spesialis",
      accessor: "spesialis",
    },
    {
      Header: "Action",
      Cell: (row) => (
        <div className="flex flex-row z-100">
          <ButtonIcon
            bgColor="bg-red-400"
            hoverColor="hover:bg-red-500"
            onClick={() => {
              console.log(row.row.values.id);
              setShowDeleteModal(true);
              setIndex(row.row.values.id);
            }}
            icon={<BsFillTrashFill />}
          />
          <ButtonIcon
            bgColor="bg-slate-400"
            hoverColor="hover:bg-slate-500"
            onClick={() => {
              // console.log(row.row.values.id)
              setShowUpdateModal(true);
              setIndex(row.row.values.id);
              getDokter(row.row.values.id);
            }}
            icon={<BsPencilFill />}
          />
        </div>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, []); // added cols
  const data = useMemo(() => dokter, [dokter]);

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data: <span className="text-blue-500">Daftar Dokter</span>
        </h1>
        <p>Subtitle</p>
      </div>
      <div className="flex flex-row">
        <ButtonMain
          text={`+ Add Dokter`}
          bgColor="bg-blue-400"
          onClick={() => navigate("/add-dokter")}
        />
        <div>
          <ExportToExcel excelData={dokter} fileName="Daftar_Dokter" />
        </div>
      </div>
      {/* {!loading ? (
        <TableContentLoader />
      ) : ( */}
        <Table columns={columns} data={data} />
      {/* )} */}

      {showUpdateModal && (
        <EditDokter
          handleClose={handleCloseUpdate}
          columns={columns}
          selectedValue={editValues}
          toUpdate={toUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          handleClose={handleCloseDelete}
          handleDelete={() => handleDelete(index)}
        />
      )}
    </>
  );
}
