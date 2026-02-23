import axios from "axios";

const BASE_URL = "http://10.249.48.27:8082";

export const spotifyApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
