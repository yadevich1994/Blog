export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

// Ответ с сервера
export default interface IListArticles {
  articles: Array<IArticle>;
  articlesCount?: number;
}
