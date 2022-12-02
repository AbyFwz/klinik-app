import React, { useEffect, useState } from "react";
import api from "../../services/API";

const FormSelect = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`/${props.data}`)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.data]);
  return (
    <div className="pr-2">
      <label
        htmlFor={props.text}
        className="block mb-1 text-sm font-medium text-gray-900"
      >
        {props.text}
      </label>
      <div>
        <select
          name={props.name}
          className={`${props.width} h-8 w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 block py-2 px-3 `}
          {...props}
        >
          {data.map((value, idx) => {
            return (
              <option key={idx} value={value.id}>
                {value.nama}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
