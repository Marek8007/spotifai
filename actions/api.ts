import axios from "axios";

const BASE_URL = "http://192.168.1.144:8082";

export const spotifyApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
