<template>
  <div class="page-container">
    <div class="page-header">
      <h1>Gestion des Clients</h1>
      <router-link to="/add-client" class="btn-add">+ Nouveau Client</router-link>
    </div>

    <div v-if="isLoading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="list-container">
      <ClientCard
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @delete="handleDelete"
        @update="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useClients } from '../composables/clients';
import { useRouter } from 'vue-router';
import ClientCard from '../components/client/ClientCard.vue';

const { clients, isLoading, error, fetchClients, deleteClient } = useClients();
const router = useRouter();

onMounted(async () => {
  fetchClients();
});

const handleDelete = async (id: number) => {
  const client = clients.value.find(c => c.id === id);
  const confirmation = confirm(`Voulez-vous vraiment supprimer ${client?.prenom} ${client?.nom} ?`);

  if (confirmation) {
    await deleteClient(id);
  }
};

const handleUpdate = (id: number) => {
  router.push(`/update-client/${id}`);
};
</script>

<style scoped>
.page-container {
  padding: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  font-weight: 700;
}

.btn-add {
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-add::before {
  content: '✨';
  font-size: 1.1rem;
}

.btn-add:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.loading {
  color: #667eea;
  font-weight: 600;
}

.error {
  color: #dc3545;
  font-weight: 600;
}
</style>
