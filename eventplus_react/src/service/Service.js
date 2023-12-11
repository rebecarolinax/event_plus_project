import axios from "axios";

/**
 * Rota para o recurso Evento
 */
export const eventsResource = '/Evento';
/**
 * Rota para o recurso Listar Próximos Eventos
 */
export const nextEventResource = '/Evento/ListarProximos';
/**
 * Rota para o recurso Listar Minhas Presenças
 */
export const myEventsResource = '/PresencasEvento/ListarMinhas';
/**
 * Rota para o recurso Presenças Evento
 */
export const presencesEventResource = '/PresencasEvento';
/**
 * Rota para o recurso Tipos de Eventos
 */
export const eventsTypeResource = `/TiposEvento`
/**
 * Rota para o recurso Instituição
 */
export const instituicaoResource = '/Instituicao';
/**
 * Rota para o recurso Login
 */
export const loginResource = '/Login';

const apiPort = '7118';
const localApiUri = `https://localhost:${apiPort}/api`;
const externalApiUri = null;

const api = axios.create({
    baseURL: localApiUri
});

export default api;