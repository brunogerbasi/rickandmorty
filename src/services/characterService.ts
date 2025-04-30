import { Filters } from "../components/common/FilterBar/FilterBar";
import api from "./api";

export const getAllCharacters = async (
  page = 1,
  filters?: Filters
) => {
  const params = new URLSearchParams({ page: String(page) });
  if (filters?.name)    params.append("name", filters.name);
  if (filters?.status)  params.append("status", filters.status);
  if (filters?.species) params.append("species", filters.species);
  if (filters?.gender)  params.append("gender", filters.gender);

  const response = await api.get(`/character?${params.toString()}`);
  return response.data;
};