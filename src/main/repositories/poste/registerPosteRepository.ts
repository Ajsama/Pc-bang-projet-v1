import { ipcMain } from "electron";
import { PosteRepository } from "./posteRepository";
import { PosteCreateDto, PosteUpdateDto } from "src/shared/poste";

export const registerPosteRepository = () => {
  const posteRepository = new PosteRepository();

  ipcMain.handle('poste:getPostes', async () => {
    const postes = await posteRepository.getPostes();
    return JSON.parse(JSON.stringify(postes));
  });

  ipcMain.handle('poste:getPosteById', async (_, id: number) => {
    const poste = await posteRepository.getPosteById(id);
    return poste ? JSON.parse(JSON.stringify(poste)) : null;
  });

  ipcMain.handle('poste:addPoste', async (_, poste: PosteCreateDto) => {
    const newPoste = await posteRepository.addPoste(poste);
    return JSON.parse(JSON.stringify(newPoste));
  });

  ipcMain.handle('poste:updatePoste', async (_, id: number, poste: PosteUpdateDto) => {
    const updatedPoste = await posteRepository.updatePoste(id, poste);
    return JSON.parse(JSON.stringify(updatedPoste));
  });

  ipcMain.handle('poste:deletePoste', async (_, id: number) => {
    await posteRepository.deletePoste(id);
  });
};
