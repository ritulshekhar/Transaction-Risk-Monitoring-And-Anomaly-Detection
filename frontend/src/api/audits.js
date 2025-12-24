import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const API = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

export const fetchAuditLogs = (page = 1, limit = 50) =>
    API.get("/audits", { params: { page, limit } });
