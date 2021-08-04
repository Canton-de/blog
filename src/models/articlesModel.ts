interface IAuthor {
  username: string;
  image: string;
}

export interface IArticle {
  author: IAuthor;
  description: string;
  createdAt: string;
  slug: string;
  title: string;
  tagList: string[];
  body?: string;
  favoritesCount: number;
  favorited: boolean;
}

export interface IArciclesParams {
  page: string;
}
