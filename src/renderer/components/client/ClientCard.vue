<template>
  <div class="card">
    <div class="card-header">
      <h3>{{ client.prenom }} {{ client.nom }}</h3>
      <div class="actions">
        <button @click="$emit('update', client.id_client)" class="btn-edit">Modifier</button>
        <button @click="$emit('delete', client.id_client)" class="btn-delete">Supprimer</button>
      </div>
    </div>
    <div class="card-body">
      <p v-if="client.email"><strong>Email:</strong> {{ client.email }}</p>
      <p v-if="client.telephone"><strong>Téléphone:</strong> {{ client.telephone }}</p>
      <p v-if="client.abonnement">
        <strong>Abonnement:</strong> {{ client.abonnement.type }}
        ({{ client.abonnement.prix }}€ / {{ client.abonnement.duree }} jours)
      </p>
      <p v-else><strong>Abonnement:</strong> Aucun</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Client } from 'src/shared/client';

defineProps<{
  client: Client;
}>();

defineEmits<{
  delete: [id: number];
  update: [id: number];
}>();
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
}

.card-header h3 {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.3rem;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.card-body p {
  margin: 0.75rem 0;
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.6;
}

.card-body strong {
  color: #2d3748;
  font-weight: 600;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-edit {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
}

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

.btn-delete {
  background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(252, 129, 129, 0.3);
}

.btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);
}
</style>
