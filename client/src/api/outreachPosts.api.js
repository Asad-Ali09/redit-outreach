import api from "../axios/axios.config";

const path = "/outreach-posts";

export const getRelevantPostsApiCall = async (id) => {
  try {
    const response = await api.get(`${path}/${id}/posts/relevant`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllPostsApiCall = async () => {
  try {
    const response = await api.get(`${path}/${id}/posts`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
