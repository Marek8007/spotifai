import { spotifyApi } from "./api";

export interface Album {
    id: number;
    nombre: string;
    foto?: string;
    anyo?: number;
    artista?: { id: number; nombre: string };
}

export const getAlbumsAction = async (): Promise<Album[]> => {
    const { data } = await spotifyApi.get<Album[]>("/albums");
    return data;
};

export const getAlbumAction = async (id: number): Promise<Album> => {
    const { data } = await spotifyApi.get<Album>(`/albums/${id}`);
    return data;
};

export const getAlbumCancionesAction = async (id: number): Promise<any[]> => {
    const { data } = await spotifyApi.get(`/albums/${id}/canciones`);
    return data;
};

export const getFollowedAlbumsAction = async (userId: number): Promise<Album[]> => {
    const { data } = await spotifyApi.get<Album[]>(`/usuarios/${userId}/albumsseguidos`);
    return data;
};

export const followAlbumAction = async (userId: number, albumId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/albumsseguidos/${albumId}`);
};

export const unfollowAlbumAction = async (userId: number, albumId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/albumsseguidos/${albumId}`);
};
