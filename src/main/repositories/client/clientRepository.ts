import { Client, ClientCreateDto, ClientUpdateDto } from "src/shared/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

export class ClientRepository {
  private dbclient: PrismaClient;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('La variable d\'environnement DATABASE_URL n\'est pas définie');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
  }

  async getClients(): Promise<Client[]> {
    const clients = await this.dbclient.client.findMany({
      include: {
        Abonnement: true
      }
    });

    return clients.map((c) => ({
      id_client: c.id_client,
      nom: c.nom,
      prenom: c.prenom,
      email: c.email,
      telephone: c.telephone,
      id_abonnement: c.id_abonnement,
      abonnement: c.Abonnement ? {
        id_abonnement: c.Abonnement.id_abonnement,
        type: c.Abonnement.type,
        prix: c.Abonnement.prix ? parseFloat(c.Abonnement.prix.toString()) : null,
        duree: c.Abonnement.duree
      } : null
    }));
  }

  async getClientById(id: number): Promise<Client | null> {
    const client = await this.dbclient.client.findUnique({
      where: { id_client: id },
      include: {
        Abonnement: true
      }
    });

    if (!client) return null;

    return {
      id_client: client.id_client,
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      id_abonnement: client.id_abonnement,
      abonnement: client.Abonnement ? {
        id_abonnement: client.Abonnement.id_abonnement,
        type: client.Abonnement.type,
        prix: client.Abonnement.prix ? parseFloat(client.Abonnement.prix.toString()) : null,
        duree: client.Abonnement.duree
      } : null
    };
  }

  async addClient(clientDto: ClientCreateDto): Promise<Client> {
    const newClient = await this.dbclient.client.create({
      data: {
        nom: clientDto.nom,
        prenom: clientDto.prenom,
        email: clientDto.email,
        telephone: clientDto.telephone,
        id_abonnement: clientDto.id_abonnement
      },
      include: {
        Abonnement: true
      }
    });

    return {
      id_client: newClient.id_client,
      nom: newClient.nom,
      prenom: newClient.prenom,
      email: newClient.email,
      telephone: newClient.telephone,
      id_abonnement: newClient.id_abonnement,
      abonnement: newClient.Abonnement ? {
        id_abonnement: newClient.Abonnement.id_abonnement,
        type: newClient.Abonnement.type,
        prix: newClient.Abonnement.prix ? parseFloat(newClient.Abonnement.prix.toString()) : null,
        duree: newClient.Abonnement.duree
      } : null
    };
  }

  // --- C'EST ICI QUE J'AI FAIS LA CORRECTION ---
  async deleteClient(id: number): Promise<void> {
    // 1. On supprime d'abord les réservations liées à ce client
    await this.dbclient.reservation.deleteMany({
      where: { id_client: id }
    });

    // 2. Ensuite on peut supprimer le client sans erreur
    await this.dbclient.client.delete({
      where: { id_client: id }
    });
  }
  // ---------------------------------------------

  async updateClient(id: number, clientDto: ClientUpdateDto): Promise<Client> {
    const updatedClient = await this.dbclient.client.update({
      where: { id_client: id },
      data: {
        nom: clientDto.nom,
        prenom: clientDto.prenom,
        email: clientDto.email,
        telephone: clientDto.telephone,
        id_abonnement: clientDto.id_abonnement
      },
      include: {
        Abonnement: true
      }
    });

    return {
      id_client: updatedClient.id_client,
      nom: updatedClient.nom,
      prenom: updatedClient.prenom,
      email: updatedClient.email,
      telephone: updatedClient.telephone,
      id_abonnement: updatedClient.id_abonnement,
      abonnement: updatedClient.Abonnement ? {
        id_abonnement: updatedClient.Abonnement.id_abonnement,
        type: updatedClient.Abonnement.type,
        prix: updatedClient.Abonnement.prix ? parseFloat(updatedClient.Abonnement.prix.toString()) : null,
        duree: updatedClient.Abonnement.duree
      } : null
    };
  }
}