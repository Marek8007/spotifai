import { spotifyApi } from "./api";

export interface Usuario {
    id: number;
    username: string;
    email: string;
    password?: string;
    genero?: string | null;
    fechaNacimiento?: string;
    pais?: string | null;
    codigoPostal?: string | null;
    isPremium?: boolean;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    fechaNacimiento: string;
    genero?: string | null;
    pais?: string | null;
    codigoPostal?: string | null;
}

// Login contra el endpoint /login de la API
export const loginAction = async (
    name: string,
    password: string
): Promise<{ user: Usuario; isPremium: boolean }> => {
    const { data } = await spotifyApi.post<Usuario & { isPremium: boolean }>("/login", {
        name,
        password,
    });
    const { isPremium = false, ...user } = data;
    return { user, isPremium };
};

// Registro de nuevo usuario
export const registerAction = async (
    userData: RegisterPayload,
    premium = false
): Promise<Usuario> => {
    const { data } = await spotifyApi.post<Usuario>(
        `/usuarios?premium=${premium ? 1 : 0}`,
        userData
    );
    return data;
};

// Obtener usuario por ID
export const getUsuarioAction = async (id: number): Promise<Usuario> => {
    const { data } = await spotifyApi.get<Usuario>(`/usuarios/${id}`);
    return data;
};

// Actualizar usuario
export const updateUsuarioAction = async (
    id: number,
    userData: Partial<Usuario>
): Promise<Usuario> => {
    const { data } = await spotifyApi.put<Usuario>(`/usuarios/${id}`, userData);
    return data;
};
