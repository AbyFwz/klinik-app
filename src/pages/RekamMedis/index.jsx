import React from "react";
import { ButtonIcon, ButtonMain } from "../../components/Button";
import ExportToExcel from "../../components/ExportToExcel";

export default function RekamMedis() {
  return (
    <>
      <div className="mb-5">
        <h1>
          Deposit 
        </h1>
        <p>Daftar pasien yang memiliki deposit</p>
      </div>
      <div className="flex flex-row">
        <ButtonMain
          text={`+ Tambah Data Baru`}
          bgColor="bg-blue-400"
          onClick={() => navigate("/add-dokter")}
        />
        <div>
          <ExportToExcel excelData={data} fileName="Daftar_Dokter" />
        </div>
      </div>
      {loading ? (
        <Table columns={columns} data={data} />
      ) : (
        <TableContentLoader />
      )}

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
          handleDelete={handleDelete(deleteIndex)}
        />
      )}
    </>
  );
}
