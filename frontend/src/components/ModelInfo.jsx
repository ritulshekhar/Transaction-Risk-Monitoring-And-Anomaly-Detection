export default function ModelInfo({ model, loading }) {
    if (loading) {
        return <div className="loading">Loading model info...</div>;
    }

    if (!model || Object.keys(model).length === 0) {
        return null;
    }

    return (
        <div className="card">
            <h3>Model Information</h3>
            <div className="model-info">
                <div className="model-info-item">
                    <strong>Model Name</strong>
                    {model.name || "Unknown"}
                </div>
                <div className="model-info-item">
                    <strong>Version</strong>
                    {model.version || "N/A"}
                </div>
                <div className="model-info-item">
                    <strong>DVC Hash</strong>
                    <code>{model.dvcHash || "N/A"}</code>
                </div>
                <div className="model-info-item">
                    <strong>Trained At</strong>
                    {model.trainedAt || "N/A"}
                </div>
            </div>
        </div>
    );
}
