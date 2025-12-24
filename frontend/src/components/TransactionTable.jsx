import RiskBadge from "./RiskBadge";

export default function TransactionTable({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Risk</th>
                </tr>
            </thead>
            <tbody>
                {data.map(tx => (
                    <tr key={tx._id}>
                        <td>{tx.userId}</td>
                        <td>{tx.amount}</td>
                        <td><RiskBadge score={tx.riskScore} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
