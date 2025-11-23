import { ipcRenderer } from "electron";
import { IArticleService } from "src/shared/interfaces/IArticleService";
import { Article, ArticleCreateDto, ArticleUpdateDto } from "src/shared/article";

export function articleService(): IArticleService {
  return {
    async getArticles(): Promise<Article[]> {
      return await ipcRenderer.invoke('article:getArticles');
    },

    async getArticleById(id: number): Promise<Article | null> {
      return await ipcRenderer.invoke('article:getArticleById', id);
    },

    async addArticle(article: ArticleCreateDto): Promise<Article> {
      return await ipcRenderer.invoke('article:addArticle', article);
    },

    async updateArticle(id: number, article: ArticleUpdateDto): Promise<Article> {
      return await ipcRenderer.invoke('article:updateArticle', id, article);
    },

    async deleteArticle(id: number): Promise<void> {
      return await ipcRenderer.invoke('article:deleteArticle', id);
    }
  };
}
