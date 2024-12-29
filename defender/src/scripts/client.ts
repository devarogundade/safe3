import axios from "axios";
import type { Content } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const fetchContents = async (domain: string): Promise<Content[]> => {
  try {
    const response = await api.get(`/contents?domain=${domain}`);
    return response.data;
  } catch (error) {
    return [];
  }
};
