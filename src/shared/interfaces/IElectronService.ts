import { IClientService } from "./IClientService";
import { IPosteService } from "./IPosteService";
import { IReservationService } from "./IReservationService";
import { IArticleService } from "./IArticleService";

export default interface IElectronService {
    clients: IClientService;
    postes: IPosteService;
    reservations: IReservationService;
    articles: IArticleService;
}

declare global {
    interface Window {
        electronService: IElectronService
    }
}