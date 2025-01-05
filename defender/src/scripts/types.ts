import type BigNumber from "bignumber.js";

export type Content = {
  tokenId: number;
  title: string;
  description: string;
  image: string;
  type: ContentType;
  category: ContentCategory;
  file: string;
  domains: string[];
  likes: `0x${string}`[];
  dislikes: `0x${string}`[];
  views: `0x${string}`[];
  creator: `0x${string}`;
};

export enum ContentType {
  Article = "Article",
  Video = "Video",
}

export enum ContentCategory {
  Warning = "Warning",
  Educative = "Educative",
}

export interface ActivationData {
  state: boolean;
}

export interface ProfileData {
  image: string;
  level: string;
  username: `${string}.edu`;
  points: BigNumber;
}
