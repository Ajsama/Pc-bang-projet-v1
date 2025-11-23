export interface Article {
  id_article: number;
  nom_article: string | null;
  description: string | null;
  prix: number | null;
  categorie: string | null;
}

export type ArticleCreateDto = Omit<Article, 'id_article'>;
export type ArticleUpdateDto = Partial<ArticleCreateDto>;
