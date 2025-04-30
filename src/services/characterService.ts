import api from "./api";

export const getAllCharacters = async (page = 1) => {
  const response = await api.get(`/character?page=${page}`);
  return response.data;
};