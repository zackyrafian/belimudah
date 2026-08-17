
export default function Pagination({ data, setPage }) {
  return ( 
    <div className="flex items-center justify-between px-2">
      <p className="text-sm text-gray-500">
        Halaman {data.page} dari {data.totalPages} &mdash; Total {data.total} produk
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage(1)}
          disabled={!data.prevPage}
          className="px-2 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          «
        </button>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={!data.prevPage}
          className="px-3 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Prev
        </button>

        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 text-sm rounded-lg border ${
              p === data.page
                ? "text-black border-black-600"
                : "border-black/10 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data.nextPage}
          className="px-3 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>
        <button
          onClick={() => setPage(data.totalPages)}
          disabled={!data.nextPage}
          className="px-2 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          »
        </button>
      </div>
    </div>
  )
}