import axios from "axios";

// EVENTOS
export const eventResource = '/Evento';
export const nextEventResource = '/Evento/ListarProximos'
export const eventsTypeResource = '/TiposEvento'
export const loginResource = '/Login'

// USUARIOS
export const usersTypeResource = '/TiposUsuario'

const apiPort = '7118'
const localApiUrl = `https://localhost:${apiPort}/api`
const externaApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
})

export default api;