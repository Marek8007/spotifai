import axios from "axios";

const BASE_URL = "http://10.0.2.2:8082";

export const spotifyApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
