export default function RiskBadge({ score }) {
    const color =
        score > 0.7 ? "red" :
            score > 0.4 ? "orange" : "green";

    return <span style={{ color }}>{score}</span>;
}
