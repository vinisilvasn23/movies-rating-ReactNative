import { api } from "../api";

const handleRequest = async (method, url, token, params) => {
  try {
    if (params) {
      if (url.endsWith("/")) {
        url = url.slice(0, -1);
      }

      if (params.page) {
        url += `?page=${params.page}`;
      } else if (params.query) {
        url += `?query=${params.query}`;
      }
    }

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

export const listPopularMovies = async (token, params) => {
  return handleRequest("get", "api/movies/popular/", token, params);
};

export const listBestAssessmentMovies = async (token, params) => {
  return handleRequest("get", "api/movies/best-assessment/", token, params);
};

export const listMovieTheaterMovies = async (token, params) => {
  return handleRequest("get", "api/movies/movie-theater/", token, params);
};

export const findMovies = async (token, params) => {
  return handleRequest("get", "api/movies/busca/", token, params);
};

export const findSeries = async (token, params) => {
  return handleRequest("get", "api/series/busca/", token, params);
};

export const detailMovie = async (token, movieId, params) => {
  return handleRequest("get", `api/movies/${movieId}/`, token, params);
};

export const creditsMovie = async (token, movieId, params) => {
  return handleRequest("get", `api/movies/${movieId}/credits/`, token, params);
};

export const providersMovie = async (token, movieId, params) => {
  return handleRequest(
    "get",
    `api/movies/${movieId}/providers/`,
    token,
    params
  );
};

export const listGenres = async (token, params) => {
  return handleRequest("get", "api/genres/", token, params);
};

export const translationMovieData = async (token, movieId) => {
  return handleRequest(
    "get",
    `api/movie/${movieId}/translations/`,
    token,
    undefined
  );
};

export const listPopularSeries = async (token, params) => {
  return handleRequest("get", "api/series/popular/", token, params);
};

export const listTopSeries = async (token, params) => {
  return handleRequest("get", "api/series/top-series/", token, params);
};