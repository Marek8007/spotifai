import axios from "axios";

// Cambia esta IP a la de tu máquina en la red local si usas dispositivo físico
// Para emulador Android usar 10.0.2.2, para iOS simulator usar localhost
const BASE_URL = "http://localhost:8082";

export const spotifyApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
