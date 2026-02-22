import { spotifyApi } from "./api";

export interface Podcast {
    id: number;
    nombre: string;
    descripcion?: string;
    foto?: string;
    autor?: string;
}

export interface Capitulo {
    id: number;
    nombre: string;
    descripcion?: string;
    duracion?: string;
    fecha?: string;
}

export const getPodcastsAction = async (): Promise<Podcast[]> => {
    const { data } = await spotifyApi.get<Podcast[]>("/podcasts");
    return data;
};

export const getPodcastAction = async (id: number): Promise<Podcast> => {
    const { data } = await spotifyApi.get<Podcast>(`/podcasts/${id}`);
    return data;
};

export const getPodcastCapitulosAction = async (id: number): Promise<Capitulo[]> => {
    const { data } = await spotifyApi.get<Capitulo[]>(`/podcasts/${id}/capitulos`);
    return data;
};

export const getCapituloAction = async (id: number): Promise<Capitulo> => {
    const { data } = await spotifyApi.get<Capitulo>(`/capitulos/${id}`);
    return data;
};

export const getFollowedPodcastsAction = async (userId: number): Promise<Podcast[]> => {
    const { data } = await spotifyApi.get<Podcast[]>(`/usuarios/${userId}/podcasts-seguidos`);
    return data;
};

export const followPodcastAction = async (userId: number, podcastId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/podcasts-seguidos/${podcastId}`);
};

export const unfollowPodcastAction = async (userId: number, podcastId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/podcasts-seguidos/${podcastId}`);
};
