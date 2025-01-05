export type Profile = {
  username: `${string}.edu`;
  address: `0x${string}`;
  description: string | null;
  image: string | null;
};

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
