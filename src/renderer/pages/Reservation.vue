<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Gestion des Réservations</h1>
      <router-link to="/add-reservation" class="btn-add">+ Nouvelle Réservation</router-link>
    </div>

    <div v-if="isLoading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="reservations-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Poste</th>
            <th>Date Début</th>
            <th>Durée (h)</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id_reservation">
            <td>{{ reservation.id_reservation }}</td>
            <td>
              <span v-if="reservation.Client">
                {{ reservation.Client.prenom }} {{ reservation.Client.nom }}
              </span>
              <span v-else class="text-deleted">
                Client supprimé (#{{ reservation.id_client }})
              </span>
            </td>
            <td>
              <span v-if="reservation.Poste">
                {{ reservation.Poste.numero_poste }} <span class="text-muted">({{ reservation.Poste.type }})</span>
              </span>
              <span v-else class="text-deleted">
                Poste supprimé (#{{ reservation.id_poste }})
              </span>
            </td>
            <td>{{ formatDate(reservation.date_debut) }}</td>
            <td>{{ reservation.duree }}h</td>
            <td>
              <span class="badge" :class="'badge-' + reservation.statut?.toLowerCase()">
                {{ reservation.statut }}
              </span>
            </td>
            <td>
              <button @click="handleUpdate(reservation.id_reservation)" class="btn-edit">Modifier</button>
              <button @click="handleDelete(reservation.id_reservation)" class="btn-delete">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useReservations } from '../composables/reservations';
import { useRouter } from 'vue-router';

const { reservations, isLoading, error, fetchReservations, deleteReservation } = useReservations();
const router = useRouter();

onMounted(async () => {
  fetchReservations();
});

const formatDate = (date: Date | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('fr-FR');
};

const handleDelete = async (id: number) => {
  const confirmation = confirm(`Voulez-vous vraiment supprimer cette réservation ?`);

  if (confirmation) {
    await deleteReservation(id);
  }
};

const handleUpdate = (id: number) => {
  router.push(`/update-reservation/${id}`);
};
</script>

<style scoped>
.page-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  color: #333;
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.reservations-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge-confirmée {
  background-color: #d4edda;
  color: #155724;
}

.badge-en.cours {
  background-color: #cce5ff;
  color: #004085;
}

.badge-terminée {
  background-color: #d1ecf1;
  color: #0c5460;
}

.badge-en.attente {
  background-color: #fff3cd;
  color: #856404;
}

.btn-edit,
.btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-right: 0.5rem;
}

.btn-edit {
  background-color: #007bff;
  color: white;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #dc3545;
}

.text-deleted {
  color: #999;
  font-style: italic;
}

.text-muted {
  color: #6c757d;
  font-size: 0.9em;
}
</style>
