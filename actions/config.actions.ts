import { spotifyApi } from "./api";

export interface Configuracion {
    id?: number;
    autoplay?: boolean;
    normalizacion?: boolean;
    ajuste?: boolean;
    calidad?: number;
    idioma?: number;
    tipoDescarga?: number;
}

export const getConfigAction = async (userId: number): Promise<Configuracion> => {
    const { data } = await spotifyApi.get<Configuracion>(`/usuarios/${userId}/configuracion`);
    return data;
};

export const updateConfigAction = async (
    userId: number,
    config: Configuracion
): Promise<Configuracion> => {
    const { data } = await spotifyApi.put<Configuracion>(
        `/usuarios/${userId}/configuracion`,
        config
    );
    return data;
};

export const getPlanAction = async (userId: number): Promise<{ plan: string; subscription: any }> => {
    const { data } = await spotifyApi.get(`/usuarios/${userId}/plan`);
    return data;
};

export const getSuscripcionesAction = async (userId: number): Promise<any> => {
    const { data } = await spotifyApi.get(`/suscripciones/${userId}`);
    return data;
};
