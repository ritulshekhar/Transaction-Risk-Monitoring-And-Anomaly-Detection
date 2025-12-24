export default function Filters({ highRiskOnly, setHighRiskOnly }) {
    return (
        <label>
            <input
                type="checkbox"
                checked={highRiskOnly}
                onChange={() => setHighRiskOnly(!highRiskOnly)}
            />
            Show High Risk Only
        </label>
    );
}
