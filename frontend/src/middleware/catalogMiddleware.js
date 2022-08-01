import axios from "axios";


export const getCatalogQTY = async (payload) => {
  const response = await axios.get(`http://localhost:3332/api/v1/catalog/getid/${payload._id}`);
  return response;
};


