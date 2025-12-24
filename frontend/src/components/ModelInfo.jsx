export default function ModelInfo({ model }) {
    return (
        <div>
            <strong>Model:</strong> {model.name} <br />
            <strong>Version:</strong> {model.version} <br />
            <strong>Trained On:</strong> {model.trainedAt}
        </div>
    );
}
