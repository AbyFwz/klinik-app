import React, { useEffect, useState, useRef, useMemo } from "react";
import Table from "../../../components/Table";
import { ButtonIcon, ButtonMain } from "../../../components/Button";
import DeleteModal from "../../../components/DeleteModal";
import {
  setJenisTindakanList,
  setSelectedData,
} from "../../../redux/jenisTindakanSlice";
import JenisTindakanService from "../../../services/JenisTindakanService";
import { useSelector, useDispatch } from "react-redux";
import UpdateJenisTindakan from "./UpdateJenisTindakan";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import AddJenisTindakan from "./AddJenisTindakan";

export default function ViewJenisTindakan() {
  const dispatch = useDispatch();
  const { jenisTindakanList, selectedData } = useSelector(
    (state) => state.jenisTindakan
  );
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => getAllJenisTindakan(), []);

  // fetch handlers
  const getAllJenisTindakan = () => {
    JenisTindakanService.getAll()
      .then((res) => {
        dispatch(setJenisTindakanList(res.data));
      })
      .catch((e) => console.log(`Error: ${e}`));
  };

  const getJenisTindakan = (id) => {
    JenisTindakanService.get(id)
      .then((res) => {
        dispatch(setSelectedData(res.data));
      })
      .catch((e) => console.log(`Error: ${e}`));
  };

  const deleteJenisTindakan = () => {
    JenisTindakanService.remove(selectedIndex).then((res) =>
      dispatch(
        setJenisTindakanList(
          jenisTindakanList.filter(
            (jenisTindakan) => jenisTindakan.id !== selectedIndex
          )
        )
      )
    );
    handleCloseDelete();
  };

  // event handlers (modals)
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseAdd = () => {
    setShowAddModal(!showAddModal);
  };

  const handleCloseUpdate = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "id",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Action",
        Cell: (row) => (
          <div className="flex flex-row z-100">
            <ButtonIcon
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={() => {
                setShowDeleteModal(true);
                setSelectedIndex(row.row.values.id);
              }}
              icon={<BsFillTrashFill />}
            />
            <ButtonIcon
              bgColor="bg-slate-400"
              hoverColor="hover:bg-slate-500"
              onClick={() => {
                setShowUpdateModal(true);
                console.log(row.row.values.id);
                getJenisTindakan(row.row.values.id);
              }}
              icon={<BsPencilFill />}
            />
          </div>
        ),
      },
    ],
    []
  );

  const data = jenisTindakanList;

  return (
    <>
      <div className="mb-5">
        <h1>
          Master Data: <span className="text-blue-500">Jenis Tindakan</span>
        </h1>
        <p>Jenis tindakan yang tersedia di Dentology</p>
      </div>
      <div className="flex flex-row">
        <ButtonMain
          text={`+ Tambah Data`}
          bgColor="bg-blue-400"
          onClick={() => setShowAddModal(true)}
        />
        {/* <div>
          <ExportToExcel excelData={dokter} fileName="Daftar_Dokter" />
        </div> */}
      </div>

      <Table columns={columns} data={data} />

      {showAddModal && <AddJenisTindakan handleClose={handleCloseAdd} />}
      {showUpdateModal && (
        <UpdateJenisTindakan handleClose={handleCloseUpdate} />
      )}
      {showDeleteModal && (
        <DeleteModal
          handleClose={handleCloseDelete}
          handleDelete={deleteJenisTindakan}
        />
      )}
    </>
  );
}
