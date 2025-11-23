<template>
  <div class="form-container">
    <h1>Modifier le Client</h1>

    <div v-if="isLoading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <form v-else @submit.prevent="handleSubmit" class="form">
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
          {{ isSubmitting ? 'Modification...' : 'Modifier' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useClients } from '../../composables/clients';

const router = useRouter();
const route = useRoute();
const { getClientById, updateClient } = useClients();

const clientId = parseInt(route.params.id as string);

const formData = ref({
  nom: '',
  prenom: '',
  email: null,
  telephone: null,
  id_abonnement: null
});

const isLoading = ref(true);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const client = await getClientById(clientId);
    if (client) {
      formData.value = {
        nom: client.nom || '',
        prenom: client.prenom || '',
        email: client.email,
        telephone: client.telephone,
        id_abonnement: client.id_abonnement
      };
    } else {
      error.value = 'Client non trouvé';
    }
  } catch (e) {
    error.value = 'Erreur lors du chargement';
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    const clientData = {
      ...formData.value,
      id_abonnement: formData.value.id_abonnement ? parseInt(formData.value.id_abonnement as any) : null
    };
    await updateClient(clientId, clientData);
    router.push('/');
  } catch (e) {
    console.error('Erreur lors de la modification:', e);
    alert('Erreur lors de la modification du client');
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
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

.form-container h1 {
  margin-bottom: 2rem;
  color: #333;
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
