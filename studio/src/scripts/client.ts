import axios from "axios";
import {
  ContentCategory,
  ContentType,
  type Content,
  type Profile,
} from "./types";

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

export const fetchContents = async (
  tokenId: number
): Promise<Content | null> => {
  try {
    const response = await api.get(`/contents/${tokenId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const likeContent = async (
  tokenId: number,
  address: `0x${string}`
): Promise<any> => {
  try {
    const response = await api.post(`/update-likes`, {
      tokenId,
      address,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const dislikeContent = async (
  tokenId: number,
  address: `0x${string}`
): Promise<any> => {
  try {
    const response = await api.post(`/update-dislikes`, {
      tokenId,
      address,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const viewContent = async (
  tokenId: number,
  address: `0x${string}`
): Promise<any> => {
  try {
    const response = await api.post(`/update-views`, {
      tokenId,
      address,
    });
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
  category: ContentCategory,
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
      category,
      domains,
      creator,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
