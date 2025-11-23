import { ref } from 'vue';
import { Reservation, ReservationCreateDto, ReservationUpdateDto } from 'src/shared/reservation';

export function useReservations() {
  const reservations = ref<Reservation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchReservations = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      reservations.value = await window.electronService.reservations.getReservations();
    } catch (e) {
      error.value = 'Erreur lors du chargement des réservations';
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const getReservationById = async (id: number): Promise<Reservation | null> => {
    try {
      return await window.electronService.reservations.getReservationById(id);
    } catch (e) {
      error.value = 'Erreur lors du chargement de la réservation';
      console.error(e);
      return null;
    }
  };

  const addReservation = async (reservation: ReservationCreateDto): Promise<void> => {
    try {
      const newReservation = await window.electronService.reservations.addReservation(reservation);
      reservations.value.push(newReservation);
    } catch (e) {
      error.value = 'Erreur lors de l\'ajout de la réservation';
      console.error(e);
      throw e;
    }
  };

  const updateReservation = async (id: number, reservation: ReservationUpdateDto): Promise<void> => {
    try {
      const updatedReservation = await window.electronService.reservations.updateReservation(id, reservation);
      const index = reservations.value.findIndex(r => r.id_reservation === id);
      if (index !== -1) {
        reservations.value[index] = updatedReservation;
      }
    } catch (e) {
      error.value = 'Erreur lors de la mise à jour de la réservation';
      console.error(e);
      throw e;
    }
  };

  const deleteReservation = async (id: number): Promise<void> => {
    try {
      await window.electronService.reservations.deleteReservation(id);
      reservations.value = reservations.value.filter(r => r.id_reservation !== id);
    } catch (e) {
      error.value = 'Erreur lors de la suppression de la réservation';
      console.error(e);
      throw e;
    }
  };

  return {
    reservations,
    isLoading,
    error,
    fetchReservations,
    getReservationById,
    addReservation,
    updateReservation,
    deleteReservation
  };
}
