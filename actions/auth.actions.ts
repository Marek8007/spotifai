import { spotifyApi } from "./api";

export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    password?: string;
    foto?: string;
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
    const { isPremium, ...user } = data;
    return { user, isPremium };
};

// Registro de nuevo usuario
export const registerAction = async (
    userData: Omit<Usuario, "id">,
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
