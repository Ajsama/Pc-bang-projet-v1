import { contextBridge } from "electron";
import { clientService } from "./clientService";
import { posteService } from "./posteService";
import { reservationService } from "./reservationService";
import { articleService } from "./articleService";
import IElectronService from "src/shared/interfaces/IElectronService";

contextBridge.exposeInMainWorld("electronService", {
    clients: clientService(),
    postes: posteService(),
    reservations: reservationService(),
    articles: articleService()
} as IElectronService)