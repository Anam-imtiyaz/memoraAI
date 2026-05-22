function MemoryItem({ fileName, uploadedAt, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 mt-6">

      <p className="text-sm text-gray-600">
        Recent Memory
      </p>

      <h3 className="text-gray-800 font-semibold mt-2">
        {fileName}
      </h3>

      <p className="text-gray-500 text-sm mt-2">
        Uploaded {uploadedAt}
      </p>

      <button
      onClick={onDelete}
      className="mt-3 px-2 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
    >
      Delete
    </button>

    </div>
  );
}

export default MemoryItem;