import { ipcMain } from "electron";
import { ArticleRepository } from "./articleRepository";
import { ArticleCreateDto, ArticleUpdateDto } from "src/shared/article";

export const registerArticleRepository = () => {
  const articleRepository = new ArticleRepository();

  ipcMain.handle('article:getArticles', async () => {
    const articles = await articleRepository.getArticles();
    return JSON.parse(JSON.stringify(articles));
  });

  ipcMain.handle('article:getArticleById', async (_, id: number) => {
    const article = await articleRepository.getArticleById(id);
    return article ? JSON.parse(JSON.stringify(article)) : null;
  });

  ipcMain.handle('article:addArticle', async (_, article: ArticleCreateDto) => {
    const newArticle = await articleRepository.addArticle(article);
    return JSON.parse(JSON.stringify(newArticle));
  });

  ipcMain.handle('article:updateArticle', async (_, id: number, article: ArticleUpdateDto) => {
    const updatedArticle = await articleRepository.updateArticle(id, article);
    return JSON.parse(JSON.stringify(updatedArticle));
  });

  ipcMain.handle('article:deleteArticle', async (_, id: number) => {
    await articleRepository.deleteArticle(id);
  });
};
