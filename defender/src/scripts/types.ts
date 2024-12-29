export type Content = {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  dislikes: number;
  views: number;
  type: ContentType;
  creator: string;
};

export enum ContentType {
  Article = "Article",
  Video = "Video",
}
