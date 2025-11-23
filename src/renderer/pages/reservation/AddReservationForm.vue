<template>
  <div class="form-container">
    <h1>Nouvelle Réservation</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="id_client">Client *</label>
        <select id="id_client" v-model="formData.id_client" required>
          <option :value="null">-- Sélectionner un client --</option>
          <option v-for="client in clients" :key="client.id_client" :value="client.id_client">
            {{ client.prenom }} {{ client.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="id_poste">Poste *</label>
        <select id="id_poste" v-model="formData.id_poste" required>
          <option :value="null">-- Sélectionner un poste --</option>
          <option v-for="poste in postes" :key="poste.id_poste" :value="poste.id_poste">
            {{ poste.numero_poste }} ({{ poste.type }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="date_debut">Date et Heure de Début *</label>
        <input
          id="date_debut"
          v-model="formData.date_debut"
          type="datetime-local"
          required
        />
      </div>

      <div class="form-group">
        <label for="duree">Durée (heures) *</label>
        <input
          id="duree"
          v-model.number="formData.duree"
          type="number"
          min="1"
          max="24"
          required
          placeholder="2"
        />
      </div>

      <div class="form-group">
        <label for="statut">Statut *</label>
        <select id="statut" v-model="formData.statut" required>
          <option value="">-- Sélectionner --</option>
          <option value="En attente">En attente</option>
          <option value="Confirmée">Confirmée</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" @click="goBack" class="btn-cancel">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Ajout...' : 'Créer la Réservation' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useReservations } from '../../composables/reservations';
import { useClients } from '../../composables/clients';
import { usePostes } from '../../composables/postes';

const router = useRouter();
const { addReservation } = useReservations();
const { clients, fetchClients } = useClients();
const { postes, fetchPostes } = usePostes();

onMounted(async () => {
  await fetchClients();
  await fetchPostes();
});

const formData = ref({
  id_client: null,
  id_poste: null,
  date_debut: '',
  duree: 2,
  statut: 'Confirmée'
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    const reservationData = {
      ...formData.value,
      id_client: formData.value.id_client ? parseInt(formData.value.id_client as any) : null,
      id_poste: formData.value.id_poste ? parseInt(formData.value.id_poste as any) : null,
      date_debut: formData.value.date_debut ? new Date(formData.value.date_debut) : null
    };
    await addReservation(reservationData);
    router.push('/reservations');
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    alert('Erreur lors de la création de la réservation');
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push('/reservations');
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

.form-container h1 {
  margin-bottom: 2rem;
  color: #333;
}

.form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: #e0e0e0;
  color: #555;
}

.btn-cancel:hover {
  background: #d0d0d0;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
