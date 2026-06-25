import { useState } from "react";

function MemoryItem({ fileName, uploadedAt, onDelete }) {

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {

    if (deleting) return;

    setDeleting(true);

    try {

      await onDelete();

    } catch (error) {

      console.log(error);
      alert("Failed to delete file.");

    }

    setDeleting(false);

  }

  return (

    <div className="bg-white rounded-2xl p-5 border border-gray-200 mt-6">

      <h3 className="text-gray-800 font-semibold mt-2">
        {fileName}
      </h3>

      <p className="text-gray-500 text-sm">
        Uploaded on - {uploadedAt}
      </p>

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="mt-3 px-2 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 disabled:bg-gray-300 disabled:text-gray-500 transition"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>

    </div>

  );
}

export default MemoryItem;