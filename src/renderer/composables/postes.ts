import { ref } from 'vue';
import { Poste, PosteCreateDto, PosteUpdateDto } from 'src/shared/poste';

export function usePostes() {
  const postes = ref<Poste[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchPostes = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      postes.value = await window.electronService.postes.getPostes();
    } catch (e) {
      error.value = 'Erreur lors du chargement des postes';
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const getPosteById = async (id: number): Promise<Poste | null> => {
    try {
      return await window.electronService.postes.getPosteById(id);
    } catch (e) {
      error.value = 'Erreur lors du chargement du poste';
      console.error(e);
      return null;
    }
  };

  const addPoste = async (poste: PosteCreateDto): Promise<void> => {
    try {
      // On transforme l'objet Vue en objet JavaScript simple
      const posteNettoye = JSON.parse(JSON.stringify(poste));
      
      const newPoste = await window.electronService.postes.addPoste(posteNettoye);
      postes.value.push(newPoste);
    } catch (e) {
      error.value = 'Erreur lors de l\'ajout du poste';
      console.error(e);
      throw e;
    }
  };

  const updatePoste = async (id: number, poste: PosteUpdateDto): Promise<void> => {
    try {
      // Nettoyage de l'objet pour éviter les erreurs de sérialisation
      const posteNettoye = JSON.parse(JSON.stringify(poste));

      const updatedPoste = await window.electronService.postes.updatePoste(id, posteNettoye);
      const index = postes.value.findIndex(p => p.id_poste === id);
      if (index !== -1) {
        postes.value[index] = updatedPoste;
      }
    } catch (e) {
      error.value = 'Erreur lors de la mise à jour du poste';
      console.error(e);
      throw e;
    }
  };

  const deletePoste = async (id: number): Promise<void> => {
    try {
      await window.electronService.postes.deletePoste(id);
      postes.value = postes.value.filter(p => p.id_poste !== id);
    } catch (e) {
      error.value = 'Erreur lors de la suppression du poste';
      console.error(e);
      throw e;
    }
  };

  return {
    postes,
    isLoading,
    error,
    fetchPostes,
    getPosteById,
    addPoste,
    updatePoste,
    deletePoste
  };
}