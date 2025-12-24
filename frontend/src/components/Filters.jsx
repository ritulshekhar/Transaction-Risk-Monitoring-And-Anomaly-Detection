export default function Filters({ highRiskOnly, setHighRiskOnly }) {
    return (
        <div className="filters">
            <label>
                <input
                    type="checkbox"
                    checked={highRiskOnly}
                    onChange={(e) => setHighRiskOnly(e.target.checked)}
                />
                Show High Risk Only (≥70%)
            </label>
        </div>
    );
}
