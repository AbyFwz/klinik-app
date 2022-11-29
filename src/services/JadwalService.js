import axios from "axios";

const baseUrl = "http://localhost:3001/jadwal";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data[1].now;
};

export default { getAll };
