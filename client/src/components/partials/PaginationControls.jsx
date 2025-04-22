
const PaginationControls = ({ hasPrevPage, hasNextPage, onPrev, onNext }) => {
    return (
      <div className="flex gap-2 px-2 pb-2 sticky top-full">
        <button
          disabled={!hasPrevPage}
          onClick={onPrev}
          className="bg-emerald-600 disabled:bg-zinc-300 disabled:text-black/[.8] hover:bg-emerald-700 w-1/2 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Prev
        </button>
        <button
          disabled={!hasNextPage}
          onClick={onNext}
          className="bg-emerald-600 disabled:bg-zinc-100 hover:bg-emerald-700 w-1/2 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default PaginationControls;
  