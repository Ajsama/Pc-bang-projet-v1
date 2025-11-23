import { Reservation, ReservationCreateDto, ReservationUpdateDto } from "../reservation";

export interface IReservationService {
  getReservations(): Promise<Reservation[]>;
  getReservationById(id: number): Promise<Reservation | null>;
  addReservation(reservation: ReservationCreateDto): Promise<Reservation>;
  updateReservation(id: number, reservation: ReservationUpdateDto): Promise<Reservation>;
  deleteReservation(id: number): Promise<void>;
}
