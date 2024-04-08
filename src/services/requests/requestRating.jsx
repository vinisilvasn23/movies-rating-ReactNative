import { api } from "../api";

export const handleRequest = async (method, url, token, dataOrParams) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let response;
    if (method.toLowerCase() === 'get' && typeof dataOrParams === 'object') {
      let queryString = Object.keys(dataOrParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(dataOrParams[key])}`).join('&');
      url += `?${queryString}`;
      response = await api[method](url, config);
    } else {
      response = await api[method](url, dataOrParams, config);
    }
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

export const postRatings = async (token, data) => {
  return handleRequest("post", "/api/ratings/", token, data);
};

export const listRatings = async (token, params) => {
  return handleRequest("get", "/api/ratings/", token, params);
};

export const getRatingDetail = async (token, ratingId) => {
  return handleRequest("get", `/api/ratings/${ratingId}/`, token);
};
