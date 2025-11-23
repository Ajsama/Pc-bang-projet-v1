import { Reservation, ReservationCreateDto, ReservationUpdateDto } from "src/shared/reservation";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

export class ReservationRepository {
  private dbclient: PrismaClient;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('La variable d\'environnement DATABASE_URL n\'est pas définie');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
  }

  async getReservations(): Promise<Reservation[]> {
    const reservations = await this.dbclient.reservation.findMany({
      // On inclut les infos du Client et du Poste pour afficher les noms
      include: {
        Client: {
          include: {
            Abonnement: true
          }
        },
        Poste: true
      },
      orderBy: {
        date_debut: 'desc' // Tri par date décroissante
      }
    });

    // Nettoyage pour Electron (évite les erreurs de sérialisation)
    return JSON.parse(JSON.stringify(reservations));
  }

  async getReservationById(id: number): Promise<Reservation | null> {
    const reservation = await this.dbclient.reservation.findUnique({
      where: { id_reservation: id },
      include: {
        Client: {
          include: {
            Abonnement: true
          }
        },
        Poste: true
      }
    });

    if (!reservation) return null;

    return JSON.parse(JSON.stringify(reservation));
  }

  async addReservation(reservationDto: ReservationCreateDto): Promise<Reservation> {
    const newReservation = await this.dbclient.reservation.create({
      data: {
        id_client: reservationDto.id_client,
        id_poste: reservationDto.id_poste,
        date_debut: reservationDto.date_debut,
        duree: reservationDto.duree,
        statut: reservationDto.statut
      },
      include: {
        Client: {
          include: {
            Abonnement: true
          }
        },
        Poste: true
      }
    });

    return JSON.parse(JSON.stringify(newReservation));
  }

  async deleteReservation(id: number): Promise<void> {
    await this.dbclient.reservation.delete({
      where: { id_reservation: id }
    });
  }

  async updateReservation(id: number, reservationDto: ReservationUpdateDto): Promise<Reservation> {
    const updatedReservation = await this.dbclient.reservation.update({
      where: { id_reservation: id },
      data: {
        id_client: reservationDto.id_client,
        id_poste: reservationDto.id_poste,
        date_debut: reservationDto.date_debut,
        duree: reservationDto.duree,
        statut: reservationDto.statut
      },
      include: {
        Client: {
          include: {
            Abonnement: true
          }
        },
        Poste: true
      }
    });

    return JSON.parse(JSON.stringify(updatedReservation));
  }
}
