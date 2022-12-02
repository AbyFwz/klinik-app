import axios from "axios";

const baseUrl = "http://localhost:3001/dokter";

const getAll = axios.get(baseUrl).then((res) => {
    return res.data;
}).catch((err) => {
    return err;
});

const get = (id) => {
    return axios.get(`${baseUrl}/${id}`);
  };

const addData = async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}

const updateData = async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
}

const removeData =  async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response;
}

export default {getAll, get, addData, updateData, removeData};
