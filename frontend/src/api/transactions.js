import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const API = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

// Get transactions with pagination and optional high-risk filter
export const fetchTransactions = (page = 1, limit = 10, highRisk = false) =>
    API.get(`/transactions`, { params: { page, limit, highRisk } });

// Create a new transaction
export const createTransaction = (data) =>
    API.post("/transactions", data);
