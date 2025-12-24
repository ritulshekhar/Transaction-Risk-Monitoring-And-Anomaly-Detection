import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const fetchTransactions = () =>
    API.get("/transactions");

export const createTransaction = (data) =>
    API.post("/transactions", data);

export const fetchTransactions = (page = 1) =>
    API.get(`/transactions?page=${page}&limit=10`);
