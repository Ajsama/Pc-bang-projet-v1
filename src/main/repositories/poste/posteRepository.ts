import { Poste, PosteCreateDto, PosteUpdateDto } from "src/shared/poste";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

export class PosteRepository {
  private dbclient: PrismaClient;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('La variable d\'environnement DATABASE_URL n\'est pas définie');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
  }

  async getPostes(): Promise<Poste[]> {
    const postes = await this.dbclient.poste.findMany();

    // CORRECTION : On utilise JSON.parse/stringify pour éviter l'erreur "Clone" d'Electron
    return JSON.parse(JSON.stringify(postes.map((p) => ({
      id_poste: p.id_poste,
      numero_poste: p.numero_poste,
      statut: p.statut,
      type: p.type
    }))));
  }

  async getPosteById(id: number): Promise<Poste | null> {
    const poste = await this.dbclient.poste.findUnique({
      where: { id_poste: id }
    });

    if (!poste) return null;

    return JSON.parse(JSON.stringify({
      id_poste: poste.id_poste,
      numero_poste: poste.numero_poste,
      statut: poste.statut,
      type: poste.type
    }));
  }

  async addPoste(posteDto: PosteCreateDto): Promise<Poste> {
    const newPoste = await this.dbclient.poste.create({
      data: {
        numero_poste: posteDto.numero_poste,
        statut: posteDto.statut,
        type: posteDto.type
      }
    });

    return JSON.parse(JSON.stringify({
      id_poste: newPoste.id_poste,
      numero_poste: newPoste.numero_poste,
      statut: newPoste.statut,
      type: newPoste.type
    }));
  }

  // --- CORRECTION MAJEURE ICI ---
  async deletePoste(id: number): Promise<void> {
    // 1. On supprime d'abord les réservations liées à ce poste
    // (Sinon la base de données bloque la suppression)
    await this.dbclient.reservation.deleteMany({
      where: { id_poste: id }
    });

    // 2. Maintenant on peut supprimer le poste
    await this.dbclient.poste.delete({
      where: { id_poste: id }
    });
  }
  // -----------------------------

  async updatePoste(id: number, posteDto: PosteUpdateDto): Promise<Poste> {
    const updatedPoste = await this.dbclient.poste.update({
      where: { id_poste: id },
      data: {
        numero_poste: posteDto.numero_poste,
        statut: posteDto.statut,
        type: posteDto.type
      }
    });

    return JSON.parse(JSON.stringify({
      id_poste: updatedPoste.id_poste,
      numero_poste: updatedPoste.numero_poste,
      statut: updatedPoste.statut,
      type: updatedPoste.type
    }));
  }
}