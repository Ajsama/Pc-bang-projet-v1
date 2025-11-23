import { Client } from "./client";
import { Poste } from "./poste";

export interface Reservation {
  id_reservation: number;
  id_client: number | null;
  id_poste: number | null;
  date_debut: Date | string | null;
  duree: number | null;
  statut: string | null;
  // Ajout des objets complets pour afficher les noms au lieu des IDs
  Client?: Client | null;
  Poste?: Poste | null;
}

export interface ReservationCreateDto {
  id_client: number;
  id_poste: number;
  date_debut: Date;
  duree: number;
  statut: string;
}

export interface ReservationUpdateDto {
  id_client?: number;
  id_poste?: number;
  date_debut?: Date;
  duree?: number;
  statut?: string;
}
