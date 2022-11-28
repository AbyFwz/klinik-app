import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/FormInput";
import { ButtonMain, ButtonOutline } from "../../../components/Button";
import {
  setJenisTindakanList,
  setSelectedData,
} from "../../../redux/jenisTindakanSlice";
import JenisTindakanService from "../../../services/JenisTindakanService";

export default function UpdateJenisTindakan({ handleClose }) {
  const dispatch = useDispatch();
  const { selectedData, jenisTindakanList } = useSelector(
    (state) => state.jenisTindakan
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSelectedData({ ...selectedData, [name]: value }));
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    JenisTindakanService.update(selectedData.id, selectedData).then((res) => {
      console.log(res.data);
      dispatch(
        setJenisTindakanList(
          jenisTindakanList.map((jenisTindakan) =>
            jenisTindakan.id !== selectedData.id ? jenisTindakan : res.data
          )
        )
      );
    });
    handleClose();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl">
        <div className="flex justify-between items-start rounded border-b dark:border-gray-600">
          <h3 className="text-xl font-Inter font-bold text-main-blue">
            Update Jenis Tindakan
          </h3>
        </div>
        <div className="my-4 w-max">
          {Object.keys(selectedData).map((selected) => (
            <FormInput
              text={selected}
              name={selected}
              value={selectedData[selected]}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="flex flex-row">
          <ButtonOutline
            text="Close"
            hoverColor="hover:bg-slate-50"
            textColor="text-blue-400"
            borderColor="border-blue-400"
            onClick={handleClose}
          />
          <ButtonMain
            text="Save Changes"
            bgColor="bg-blue-400"
            hoverColor="hover:bg-blue-500"
            onClick={handleSubmitUpdate}
          />
        </div>
      </div>
    </div>
  );
}
