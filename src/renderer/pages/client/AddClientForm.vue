<template>
  <div class="form-container">
    <h1>Ajouter un Client</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="nom">Nom *</label>
        <input
          id="nom"
          v-model="formData.nom"
          type="text"
          required
          placeholder="Nom du client"
        />
      </div>

      <div class="form-group">
        <label for="prenom">Prénom *</label>
        <input
          id="prenom"
          v-model="formData.prenom"
          type="text"
          required
          placeholder="Prénom du client"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="email@exemple.com"
        />
      </div>

      <div class="form-group">
        <label for="telephone">Téléphone</label>
        <input
          id="telephone"
          v-model="formData.telephone"
          type="tel"
          placeholder="0123456789"
        />
      </div>

      <div class="form-group">
        <label for="abonnement">Abonnement</label>
        <select id="abonnement" v-model="formData.id_abonnement">
          <option :value="null">Aucun</option>
          <option value="1">Basique (10€ / 30 jours)</option>
          <option value="2">Premium (25€ / 30 jours)</option>
          <option value="3">VIP (50€ / 30 jours)</option>
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
import { useClients } from '../../composables/clients';

const router = useRouter();
const { addClient } = useClients();

const formData = ref({
  nom: '',
  prenom: '',
  email: null,
  telephone: null,
  id_abonnement: null
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    const clientData = {
      ...formData.value,
      id_abonnement: formData.value.id_abonnement ? parseInt(formData.value.id_abonnement as any) : null
    };
    await addClient(clientData);
    router.push('/');
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    alert('Erreur lors de l\'ajout du client');
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2.5rem;
  min-height: calc(100vh - 100px);
}

.form-container h1 {
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
}

.form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.form-group {
  margin-bottom: 1.75rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 700;
  color: #2d3748;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(102, 126, 234, 0.1);
}

.btn-cancel,
.btn-submit {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-cancel {
  background: #e2e8f0;
  color: #4a5568;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-cancel:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
