import { ref } from 'vue';
import { Client, ClientCreateDto, ClientUpdateDto } from 'src/shared/client';

export function useClients() {
  const clients = ref<Client[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchClients = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      clients.value = await window.electronService.clients.getClients();
    } catch (e) {
      error.value = 'Erreur lors du chargement des clients';
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const getClientById = async (id: number): Promise<Client | null> => {
    try {
      return await window.electronService.clients.getClientById(id);
    } catch (e) {
      error.value = 'Erreur lors du chargement du client';
      console.error(e);
      return null;
    }
  };

  const addClient = async (client: ClientCreateDto): Promise<void> => {
    try {
      const newClient = await window.electronService.clients.addClient(client);
      clients.value.push(newClient);
    } catch (e) {
      error.value = 'Erreur lors de l\'ajout du client';
      console.error(e);
      throw e;
    }
  };

  const updateClient = async (id: number, client: ClientUpdateDto): Promise<void> => {
    try {
      const updatedClient = await window.electronService.clients.updateClient(id, client);
      const index = clients.value.findIndex(c => c.id_client === id);
      if (index !== -1) {
        clients.value[index] = updatedClient;
      }
    } catch (e) {
      error.value = 'Erreur lors de la mise à jour du client';
      console.error(e);
      throw e;
    }
  };

  const deleteClient = async (id: number): Promise<void> => {
    try {
      await window.electronService.clients.deleteClient(id);
      clients.value = clients.value.filter(c => c.id_client !== id);
    } catch (e) {
      error.value = 'Erreur lors de la suppression du client';
      console.error(e);
      throw e;
    }
  };

  return {
    clients,
    isLoading,
    error,
    fetchClients,
    getClientById,
    addClient,
    updateClient,
    deleteClient
  };
}
