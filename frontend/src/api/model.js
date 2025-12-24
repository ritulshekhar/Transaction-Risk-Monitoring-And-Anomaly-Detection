import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const API = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

export const fetchModelInfo = () =>
    API.get("/model/info");
