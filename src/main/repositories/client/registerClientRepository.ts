import { ipcMain } from "electron";
import { ClientRepository } from "./clientRepository";
import { ClientCreateDto, ClientUpdateDto } from "src/shared/client";

export const registerClientRepository = () => {
  const clientRepository = new ClientRepository();

  ipcMain.handle('client:getClients', async () => {
    const clients = await clientRepository.getClients();
    return JSON.parse(JSON.stringify(clients));
  });

  ipcMain.handle('client:getClientById', async (_, id: number) => {
    const client = await clientRepository.getClientById(id);
    return client ? JSON.parse(JSON.stringify(client)) : null;
  });

  ipcMain.handle('client:addClient', async (_, client: ClientCreateDto) => {
    const newClient = await clientRepository.addClient(client);
    return JSON.parse(JSON.stringify(newClient));
  });

  ipcMain.handle('client:updateClient', async (_, id: number, client: ClientUpdateDto) => {
    const updatedClient = await clientRepository.updateClient(id, client);
    return JSON.parse(JSON.stringify(updatedClient));
  });

  ipcMain.handle('client:deleteClient', async (_, id: number) => {
    await clientRepository.deleteClient(id);
  });
};
