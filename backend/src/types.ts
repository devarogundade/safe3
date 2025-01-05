/* eslint-disable prettier/prettier */

export enum ContentType {
  Article = 'Article',
  Video = 'Video',
}

export enum ContentCategory {
  Warning = 'Warning',
  Educative = 'Educative',
}

export type ProfileDto = {
  username: `${string}.edu`;
  address: `0x${string}`;
  description: string | null;
  image: string | null;
};

export type ContentDto = {
  tokenId: number;
  title: string;
  description: string;
  image: string;
  file: string | null;
  type: ContentType;
  category: ContentCategory;
  domains: string[];
  creator: `0x${string}`;
};

export type ContentUpdateDto = {
  tokenId: number;
  address: `0x${string}`;
};
