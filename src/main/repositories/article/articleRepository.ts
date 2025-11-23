import { Article, ArticleCreateDto, ArticleUpdateDto } from "src/shared/article";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

export class ArticleRepository {
  private dbclient: PrismaClient;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('La variable d\'environnement DATABASE_URL n\'est pas définie');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
  }

  async getArticles(): Promise<Article[]> {
    const articles = await this.dbclient.article.findMany();

    return articles.map((a) => ({
      id_article: a.id_article,
      nom_article: a.nom_article,
      description: a.description,
      prix: a.prix ? parseFloat(a.prix.toString()) : null,
      categorie: a.categorie
    }));
  }

  async getArticleById(id: number): Promise<Article | null> {
    const article = await this.dbclient.article.findUnique({
      where: { id_article: id }
    });

    if (!article) return null;

    return {
      id_article: article.id_article,
      nom_article: article.nom_article,
      description: article.description,
      prix: article.prix ? parseFloat(article.prix.toString()) : null,
      categorie: article.categorie
    };
  }

  async addArticle(articleDto: ArticleCreateDto): Promise<Article> {
    const newArticle = await this.dbclient.article.create({
      data: {
        nom_article: articleDto.nom_article,
        description: articleDto.description,
        prix: articleDto.prix,
        categorie: articleDto.categorie
      }
    });

    return {
      id_article: newArticle.id_article,
      nom_article: newArticle.nom_article,
      description: newArticle.description,
      prix: newArticle.prix ? parseFloat(newArticle.prix.toString()) : null,
      categorie: newArticle.categorie
    };
  }

  async deleteArticle(id: number): Promise<void> {
    await this.dbclient.article.delete({
      where: { id_article: id }
    });
  }

  async updateArticle(id: number, articleDto: ArticleUpdateDto): Promise<Article> {
    const updatedArticle = await this.dbclient.article.update({
      where: { id_article: id },
      data: {
        nom_article: articleDto.nom_article,
        description: articleDto.description,
        prix: articleDto.prix,
        categorie: articleDto.categorie
      }
    });

    return {
      id_article: updatedArticle.id_article,
      nom_article: updatedArticle.nom_article,
      description: updatedArticle.description,
      prix: updatedArticle.prix ? parseFloat(updatedArticle.prix.toString()) : null,
      categorie: updatedArticle.categorie
    };
  }
}
