import { registerClientRepository } from "./repositories/client/registerClientRepository";
import { registerPosteRepository } from "./repositories/poste/registerPosteRepository";
import { registerReservationRepository } from "./repositories/reservation/registerReservationRepository";
import { registerArticleRepository } from "./repositories/article/registerArticleRepository";

export function registerRepositories()
{
    registerClientRepository();
    registerPosteRepository();
    registerReservationRepository();
    registerArticleRepository();
}
