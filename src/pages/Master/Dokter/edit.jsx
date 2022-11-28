import React, { useState } from "react";
import { ButtonMain, ButtonOutline } from "../../../components/Button";
import FormInput from "../../../components/FormInput";
// import { setDokter } from "../../redux/dokterSlice";
import DokterService from "../../../services/DokterService";
import { useDispatch } from "react-redux";

// sample layout
export default function EditDokter({
  handleClose,
  columns,
  selectedValue,
  toUpdate,
}) {

  const dispatch = useDispatch();

  const defaultValues = {
    id: toUpdate.id,
    nama: toUpdate.nama,
    spesialis: toUpdate.spesialis,
  };

  const [values, setFormValues] = useState(defaultValues);

  // const updateData = (id, values) => {
  //   DokterService.updateData(id, values).then((res) =>
  //    { dispatch(setDokter(res));
  //     console.log(res);}
  //   );
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...values,
      [name]: value,
    });
  };

  //TODO: add global value https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    // updateData(values.id, values);
    // window.location.reload()
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl">
        <div className="flex justify-between items-start rounded border-b dark:border-gray-600">
          <h3 className="text-xl font-Inter font-bold text-main-blue">
            Update Data
          </h3>
        </div>
        <div className="my-4 w-max">
          {columns.map(
            (column, i) =>
              i !== 3 && (
                <FormInput
                  text={column.Header}
                  name={column.accessor}
                  value={selectedValue[i]}
                  onChange={handleChange}
                />
              )
          )}
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
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
