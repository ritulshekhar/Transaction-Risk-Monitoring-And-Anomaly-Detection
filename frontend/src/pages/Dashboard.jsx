import { useEffect, useState } from "react";
import { fetchTransactions } from "../api/transactions";
import TransactionTable from "../components/TransactionTable";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions().then(res => setTransactions(res.data));
    }, []);

    return (
        <div>
            <h2>Transaction Risk Dashboard</h2>
            <TransactionTable data={transactions} />
        </div>
    );
}
