import axios from "axios";
import { ContentType, type Content, type Profile } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const fetchProfile = async (
  address: `0x${string}`
): Promise<Profile | null> => {
  try {
    const response = await api.get(`/profiles/${address}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createProfile = async (
  username: `${string}.edu`,
  address: `0x${string}`,
  description: string | null,
  image: string | null
): Promise<Profile | null> => {
  try {
    const response = await api.post(`/create-profile`, {
      username,
      address,
      description,
      image,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createContent = async (
  tokenId: number,
  title: string,
  description: string,
  image: string,
  file: string | null,
  type: ContentType,
  domains: string[],
  creator: `0x${string}`
): Promise<Content | null> => {
  try {
    const response = await api.post(`/create-content`, {
      tokenId,
      title,
      description,
      image,
      file,
      type,
      domains,
      creator,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
