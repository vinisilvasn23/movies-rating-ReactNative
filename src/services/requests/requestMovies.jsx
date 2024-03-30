import { api } from "../api";

const handleRequest = async (method, url, token, params) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await api[method](url, config);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(`Erro na requisição ${method} para ${url}:`, error.response.data);
    } else {
      console.error(`Erro na requisição ${method} para ${url}:`, error);
    }
    throw error;
  }
};

export const listPopularMovies = async (token, params) => {
  return handleRequest("get", "/movies/popular/", token, params);
};

export const listBestAssessmentMovies = async (token, params) => {
  return handleRequest("get", "/movies/best-assessment/", token, params);
};

export const listMovieTheaterMovies = async (token, params) => {
  return handleRequest("get", "/movies/movie-theater/", token, params);
};

export const findMovies = async (token, params) => {
  return handleRequest("get", "/movies/busca/", token, params);
};

export const detailMovie = async (token, movieId, params) => {
  return handleRequest("get", `/movies/${movieId}/`, token, params);
};

export const creditsMovie = async (token, movieId, params) => {
  return handleRequest("get", `/movies/${movieId}/credits/`, token, params);
};

export const providersMovie = async (token, movieId, params) => {
  return handleRequest("get", `/movies/${movieId}/providers/`, token, params);
};

export const listGenres = async (token, params) => {
  return handleRequest("get", "/genres/", token, params);
};
