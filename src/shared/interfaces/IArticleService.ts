import { Article, ArticleCreateDto, ArticleUpdateDto } from "../article";

export interface IArticleService {
  getArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | null>;
  addArticle(article: ArticleCreateDto): Promise<Article>;
  updateArticle(id: number, article: ArticleUpdateDto): Promise<Article>;
  deleteArticle(id: number): Promise<void>;
}
