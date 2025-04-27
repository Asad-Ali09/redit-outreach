import api from "../axios/axios.config";

const path = "/auth";

export const devLoginApiCall = async () => {
  try {
    const response = await api.get(`${path}/dev-login`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
