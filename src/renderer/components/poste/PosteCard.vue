<template>
  <div class="card" :class="'status-' + poste.statut?.toLowerCase()">
    <div class="card-header">
      <h3>{{ poste.numero_poste }}</h3>
      <span class="badge" :class="'badge-' + poste.statut?.toLowerCase()">
        {{ poste.statut }}
      </span>
    </div>
    <div class="card-body">
      <p><strong>Type:</strong> {{ poste.type }}</p>
      <div class="actions">
        <button @click="$emit('update', poste.id_poste)" class="btn-edit">Modifier</button>
        <button @click="$emit('delete', poste.id_poste)" class="btn-delete">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Poste } from 'src/shared/poste';

defineProps<{
  poste: Poste;
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

.status-libre::before {
  background: linear-gradient(90deg, #48bb78, #38a169, #2f855a);
}

.status-occupé::before {
  background: linear-gradient(90deg, #fc8181, #f56565, #e53e3e);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.card-header h3 {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.4rem;
  font-weight: 700;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.badge-libre {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.badge-occupé {
  background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
  color: white;
}

.card-body p {
  margin: 0.75rem 0;
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.6;
}

.card-body strong {
  color: #2d3748;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
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
