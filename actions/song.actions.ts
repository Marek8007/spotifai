import { spotifyApi } from "./api";

export interface Cancion {
    id: number;
    titulo: string;
    duracion?: number;
    ruta?: string | null;
    numeroReproducciones?: number;
}

export const getCancionesAction = async (): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<Cancion[]>("/canciones");
    return data;
};

export const getCancionAction = async (id: number): Promise<Cancion> => {
    const { data } = await spotifyApi.get<Cancion>(`/canciones/${id}`);
    return data;
};

export const getSavedSongsAction = async (userId: number): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<Cancion[]>(`/usuarios/${userId}/canciones-guardadas`);
    return data;
};

export const saveSongAction = async (userId: number, cancionId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/canciones-guardadas/${cancionId}`);
};

export const unsaveSongAction = async (userId: number, cancionId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/canciones-guardadas/${cancionId}`);
};
