import { spotifyApi } from "./api";

export interface Playlist {
    id: number;
    titulo: string;
    numeroCanciones?: number;
    fechaCreacion?: string;
}

export interface Cancion {
    id: number;
    titulo: string;
    duracion?: number;
    ruta?: string | null;
    numeroReproducciones?: number;
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
    playlist: { titulo: string }
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
export const getPlaylistSongsAction = async (playlistId: number): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<{ cancion: Cancion }[]>(`/playlist/${playlistId}/canciones`);
    return data.map((item) => item.cancion);
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
