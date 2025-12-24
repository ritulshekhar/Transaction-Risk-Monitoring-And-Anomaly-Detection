export default function Pagination({ page, setPage, totalPages, total }) {
    return (
        <div className="pagination">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                ← Previous
            </button>
            <span>
                Page {page} of {totalPages || 1} ({total || 0} total)
            </span>
            <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next →
            </button>
        </div>
    );
}
