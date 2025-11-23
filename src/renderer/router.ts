import { createRouter, createMemoryHistory } from "vue-router";

import Client from "./pages/Client.vue";
import Poste from "./pages/Poste.vue";
import Reservation from "./pages/Reservation.vue";
import AddClientForm from "./pages/client/AddClientForm.vue";
import UpdateClientForm from "./pages/client/UpdateClientForm.vue";
import AddPosteForm from "./pages/poste/AddPosteForm.vue";
import UpdatePosteForm from "./pages/poste/UpdatePosteForm.vue";
import AddReservationForm from "./pages/reservation/AddReservationForm.vue";
import UpdateReservationForm from "./pages/reservation/UpdateReservationForm.vue";

const routes = [
    { path: "/", component: Client},
    { path: "/add-client", component: AddClientForm},
    { path: "/update-client/:id", component: UpdateClientForm},
    { path: "/postes", component: Poste},
    { path: "/add-poste", component: AddPosteForm},
    { path: "/update-poste/:id", component: UpdatePosteForm},
    { path: "/reservations", component: Reservation},
    { path: "/add-reservation", component: AddReservationForm},
    { path: "/update-reservation/:id", component: UpdateReservationForm},
]

export const router = createRouter({routes, history: createMemoryHistory()});