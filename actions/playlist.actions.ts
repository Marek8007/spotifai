import { spotifyApi } from "./api";

export interface Playlist {
    id: number;
    nombre: string;
    titulo?: string;
    descripcion?: string;
    foto?: string;
    numeroCanciones?: number;
    fechaCreacion?: string;
}

export interface Cancion {
    id: number;
    nombre: string;
    duracion?: string;
    foto?: string;
    album?: { id: number; nombre: string; artista?: { nombre: string } };
}

// Todas las playlists
export const getPlaylistsAction = async (): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<Playlist[]>("/playlists");
    return data;
};

// Playlist por ID
export const getPlaylistAction = async (id: number): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<Playlist[]>(`/playlist/${id}`);
    return data;
};

// Playlists del usuario (propias)
export const getUserPlaylistsAction = async (userId: number): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<Playlist[]>(`/usuarios/${userId}/playlist`);
    return data;
};

// Crear playlist para usuario
export const createPlaylistAction = async (
    userId: number,
    playlist: { nombre: string; descripcion?: string }
): Promise<void> => {
    await spotifyApi.post(`/usuarios/${userId}/playlist`, playlist);
};

// Playlists seguidas por el usuario
export const getFollowedPlaylistsAction = async (userId: number): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<Playlist[]>(`/usuarios/${userId}/playlists-seguidas`);
    return data;
};

// Seguir playlist
export const followPlaylistAction = async (userId: number, playlistId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/playlistsseguidas/${playlistId}`);
};

// Dejar de seguir playlist
export const unfollowPlaylistAction = async (userId: number, playlistId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/playlistsseguidas/${playlistId}`);
};

// Canciones de una playlist
export const getPlaylistSongsAction = async (playlistId: number): Promise<any[]> => {
    const { data } = await spotifyApi.get(`/playlist/${playlistId}/canciones`);
    return data;
};

// Añadir canción a playlist
export const addSongToPlaylistAction = async (
    playlistId: number,
    cancionId: number,
    usuarioId: number
): Promise<void> => {
    await spotifyApi.post(`/playlist/${playlistId}/canciones`, { cancionId, usuarioId });
};

// Eliminar canción de playlist
export const removeSongFromPlaylistAction = async (
    playlistId: number,
    cancionId: number
): Promise<void> => {
    await spotifyApi.delete(`/playlists/${playlistId}/canciones/${cancionId}`);
};
