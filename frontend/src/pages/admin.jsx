import { useEffect, useState } from "react";
import { fetchAuditLogs } from "../api/audits";

export default function Admin() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchAuditLogs().then(res => setLogs(res.data));
    }, []);

    return (
        <div>
            <h2>Audit Logs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log._id}>
                            <td>{log.action}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
