<template>
  <div class="form-container">
    <h1>Ajouter un Poste</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="numero_poste">Numéro de Poste *</label>
        <input
          id="numero_poste"
          v-model="formData.numero_poste"
          type="text"
          required
          placeholder="P1, P2, etc."
        />
      </div>

      <div class="form-group">
        <label for="type">Type *</label>
        <select id="type" v-model="formData.type" required>
          <option value="">-- Sélectionner --</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div class="form-group">
        <label for="statut">Statut *</label>
        <select id="statut" v-model="formData.statut" required>
          <option value="">-- Sélectionner --</option>
          <option value="Libre">Libre</option>
          <option value="Occupé">Occupé</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" @click="goBack" class="btn-cancel">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Ajout...' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostes } from '../../composables/postes';

const router = useRouter();
const { addPoste } = usePostes();

const formData = ref({
  numero_poste: '',
  type: '',
  statut: 'Libre'
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await addPoste(formData.value);
    router.push('/postes');
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    alert('Erreur lors de l\'ajout du poste');
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push('/postes');
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
