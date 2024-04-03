import { api } from "../api";

const handleRequest = async (method, url, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api[method](url, config);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        `Erro na requisição ${method} para ${url}:`,
        error.response.data
      );
    } else {
      console.error(`Erro na requisição ${method} para ${url}:`, error);
    }
    throw error;
  }
};

export const listRatings = async (token, data) => {
  return handleRequest("post", "/ratings/", token, data);
};

export const getRatingDetail = async (token, ratingId) => {
  return handleRequest("get", `/ratings/${ratingId}/`, token);
};
