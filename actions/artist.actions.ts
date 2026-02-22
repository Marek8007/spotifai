import { spotifyApi } from "./api";

export interface Artista {
    id: number;
    nombre: string;
    foto?: string;
}

export const getArtistasAction = async (): Promise<Artista[]> => {
    const { data } = await spotifyApi.get<Artista[]>("/artistas");
    return data;
};

export const getArtistaAction = async (id: number): Promise<Artista> => {
    const { data } = await spotifyApi.get<Artista>(`/artistas/${id}`);
    return data;
};

export const getArtistaAlbumsAction = async (id: number): Promise<any[]> => {
    const { data } = await spotifyApi.get(`/artistas/${id}/albums`);
    return data;
};

export const getArtistaCancionesAction = async (id: number): Promise<any[]> => {
    const { data } = await spotifyApi.get(`/artistas/${id}/canciones`);
    return data;
};

export const getFollowedArtistasAction = async (userId: number): Promise<Artista[]> => {
    const { data } = await spotifyApi.get<Artista[]>(`/usuarios/${userId}/artistas-seguidos`);
    return data;
};

export const followArtistaAction = async (userId: number, artistaId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/artistasseguidos/${artistaId}`);
};

export const unfollowArtistaAction = async (userId: number, artistaId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/artistasseguidos/${artistaId}`);
};
