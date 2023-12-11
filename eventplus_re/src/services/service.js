import axios from "axios";

/**
 * route to Event
 */
export const eventsResource = '/Evento'
/**
 * route to nextEvents
 */
export const listNextEventsResource = '/Evento/ListarProximos'
/**
 * route to eventTypes
 */
export const eventTypesResource = '/TiposEvento'
/**
 * route to Login
 */
export const loginResource = '/Login'
/**
 * route to myEvents
 */
export const eventPresencesResource = '/PresencasEvento'

export const myComentaryEventResource = "/ComentariosEvento/BuscarPorIdUsuario"

export const comentaryEventResource = "/ComentariosEvento"

const portAPI = "7118";
const localApiUrl = `https://localhost:${portAPI}/api`;
const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
});

export default api;