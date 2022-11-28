import axios from "axios";

const baseUrl = "http://localhost:3001/jenis_tindakan";

const getAll = () => {
  return axios.get(baseUrl);
};

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (data) => {
  return axios.post(`${baseUrl}`, data);
};

const update = (id, data) => {
  return axios.put(`${baseUrl}/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const JenisTindakanService = { getAll, get, create, update, remove };
export default JenisTindakanService;
