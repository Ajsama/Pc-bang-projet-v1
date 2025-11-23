import { ipcMain } from "electron";
import { ReservationRepository } from "./reservationRepository";
import { ReservationCreateDto, ReservationUpdateDto } from "src/shared/reservation";

export const registerReservationRepository = () => {
  const reservationRepository = new ReservationRepository();

  ipcMain.handle('reservation:getReservations', async () => {
    const reservations = await reservationRepository.getReservations();
    return JSON.parse(JSON.stringify(reservations));
  });

  ipcMain.handle('reservation:getReservationById', async (_, id: number) => {
    const reservation = await reservationRepository.getReservationById(id);
    return reservation ? JSON.parse(JSON.stringify(reservation)) : null;
  });

  ipcMain.handle('reservation:addReservation', async (_, reservation: ReservationCreateDto) => {
    const newReservation = await reservationRepository.addReservation(reservation);
    return JSON.parse(JSON.stringify(newReservation));
  });

  ipcMain.handle('reservation:updateReservation', async (_, id: number, reservation: ReservationUpdateDto) => {
    const updatedReservation = await reservationRepository.updateReservation(id, reservation);
    return JSON.parse(JSON.stringify(updatedReservation));
  });

  ipcMain.handle('reservation:deleteReservation', async (_, id: number) => {
    await reservationRepository.deleteReservation(id);
  });
};
