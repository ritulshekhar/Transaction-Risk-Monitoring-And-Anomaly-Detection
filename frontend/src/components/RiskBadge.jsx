export default function RiskBadge({ score }) {
    const getRiskLevel = (score) => {
        if (score >= 0.7) return { level: "high", label: "High Risk" };
        if (score >= 0.4) return { level: "medium", label: "Medium Risk" };
        return { level: "low", label: "Low Risk" };
    };

    const { level, label } = getRiskLevel(score);

    return (
        <span className={`risk-badge risk-${level}`} title={`Risk Score: ${score}`}>
            {(score * 100).toFixed(0)}% - {label}
        </span>
    );
}
