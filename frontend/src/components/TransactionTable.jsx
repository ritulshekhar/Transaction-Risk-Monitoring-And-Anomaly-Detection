import RiskBadge from "./RiskBadge";

export default function TransactionTable({ data, loading }) {
    if (loading) {
        return <div className="loading">Loading transactions...</div>;
    }

    if (!data || data.length === 0) {
        return (
            <div className="card">
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                    No transactions found.
                </p>
            </div>
        );
    }

    return (
        <div className="card">
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Risk Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((tx) => (
                        <tr key={tx._id}>
                            <td>{tx.userId}</td>
                            <td>${tx.amount?.toLocaleString()}</td>
                            <td>
                                {tx.timestamp
                                    ? new Date(tx.timestamp).toLocaleDateString()
                                    : "N/A"}
                            </td>
                            <td>
                                <RiskBadge score={tx.riskScore} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
