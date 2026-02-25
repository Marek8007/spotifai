import { spotifyApi } from "./api";

export interface AlbumArtist {
    id: number;
    nombre: string;
    imagen?: string | null;
}

export interface Album {
    id: number;
    titulo: string;
    imagen?: string | null;
    anyo?: string;
    artista?: AlbumArtist[];
}

export interface FollowedAlbum {
    id: number;
    titulo: string;
    imagen?: string | null;
    anyo?: string;
    artista?: AlbumArtist;
}

export interface AlbumSong {
    id: number;
    titulo: string;
    duracion?: number;
    ruta?: string | null;
    numeroReproducciones?: number;
}

export const getAlbumsAction = async (): Promise<Album[]> => {
    const { data } = await spotifyApi.get<Album[]>("/albums");
    return data;
};

export const getAlbumAction = async (id: number): Promise<Album> => {
    const { data } = await spotifyApi.get<Album>(`/albums/${id}`);
    return data;
};

export const getAlbumCancionesAction = async (id: number): Promise<AlbumSong[]> => {
    const { data } = await spotifyApi.get<AlbumSong[]>(`/albums/${id}/canciones`);
    return data;
};

export const getFollowedAlbumsAction = async (userId: number): Promise<FollowedAlbum[]> => {
    const { data } = await spotifyApi.get<FollowedAlbum[]>(`/usuarios/${userId}/albumsseguidos`);
    return data;
};

export const followAlbumAction = async (userId: number, albumId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/albumsseguidos/${albumId}`);
};

export const unfollowAlbumAction = async (userId: number, albumId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/albumsseguidos/${albumId}`);
};
