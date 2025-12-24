export default function Pagination({ page, setPage, total }) {
    return (
        <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
            </button>
            <span> Page {page} </span>
            <button disabled={page * 10 >= total} onClick={() => setPage(page + 1)}>
                Next
            </button>
        </div>
    );
}
