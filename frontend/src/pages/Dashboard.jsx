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
    const [highRiskOnly, setHighRiskOnly] = useState(false);

    useEffect(() => {
        fetchTransactions(page).then(res => setTransactions(res.data));
        fetchModelInfo().then(res => setModel(res.data));
    }, [page]);

    const filtered = highRiskOnly
        ? transactions.filter(tx => tx.riskScore > 0.7)
        : transactions;

    return (
        <div>
            <h2>Transaction Risk Dashboard</h2>
            <ModelInfo model={model} />
            <Filters highRiskOnly={highRiskOnly} setHighRiskOnly={setHighRiskOnly} />
            <TransactionTable data={filtered} />
            <Pagination page={page} setPage={setPage} total={100} />
        </div>
    );
}
