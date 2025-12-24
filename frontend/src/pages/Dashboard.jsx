import { useEffect, useState } from "react";
import { fetchTransactions } from "../api/transactions";
import { fetchModelInfo } from "../api/model";
import TransactionTable from "../components/TransactionTable";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import ModelInfo from "../components/ModelInfo";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [model, setModel] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [highRiskOnly, setHighRiskOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modelLoading, setModelLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch transactions when page or filter changes
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchTransactions(page, 10, highRiskOnly)
            .then((res) => {
                setTransactions(res.data.transactions || []);
                setTotalPages(res.data.pages || 1);
                setTotal(res.data.total || 0);
            })
            .catch((err) => {
                console.error("Failed to fetch transactions:", err);
                setError("Failed to load transactions. Is the backend running?");
            })
            .finally(() => setLoading(false));
    }, [page, highRiskOnly]);

    // Fetch model info once on mount
    useEffect(() => {
        fetchModelInfo()
            .then((res) => setModel(res.data))
            .catch((err) => console.error("Failed to fetch model info:", err))
            .finally(() => setModelLoading(false));
    }, []);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setPage(1);
    }, [highRiskOnly]);

    return (
        <div className="container">
            <h2>🛡️ Transaction Risk Dashboard</h2>

            <ModelInfo model={model} loading={modelLoading} />

            <Filters
                highRiskOnly={highRiskOnly}
                setHighRiskOnly={setHighRiskOnly}
            />

            {error ? (
                <div className="card" style={{ color: "var(--accent-red)" }}>
                    {error}
                </div>
            ) : (
                <>
                    <TransactionTable data={transactions} loading={loading} />
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        total={total}
                    />
                </>
            )}
        </div>
    );
}
