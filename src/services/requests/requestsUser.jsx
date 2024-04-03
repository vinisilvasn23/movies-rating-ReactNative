import { api } from "../api";

const handleRequest = async (method, url, token, data) => {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    let response;
    if (data) {
      response = await api[method](url, data, config);
    } else {
      response = await api[method](url, config);
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

export const createUser = async (userData) => {
  return handleRequest("post", "/api/users/", undefined, userData);
};

export const loginUser = async (loginData) => {
  return handleRequest("post", "/api/login/", undefined, loginData);
};

export const forgotPassword = async (data) => {
  return handleRequest("post", "/api/forgot-password/", undefined, data);
};

export const tokenRefresh = async () => {
  return handleRequest("post", "/api/token/refresh/", undefined, undefined);
};

export const getUsers = async () => {
  return handleRequest("get", "/api/users/", undefined, undefined);
};

export const getUserById = async (token, userId) => {
  return handleRequest("get", `/api/users/${userId}/`, token, undefined);
};

export const updateUser = async (token, userId, updatedData) => {
  return handleRequest("patch", `/api/users/${userId}/`, token, updatedData);
};

export const deleteUser = async (token, userId) => {
  return handleRequest("delete", `/api/users/${userId}/`, token, undefined);
};
