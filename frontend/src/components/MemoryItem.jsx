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

async function handleView() {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8081/view/${encodeURIComponent(fileName)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {

      alert("Unable to open document.");
      return;

    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    window.open(url, "_blank");

  } catch (error) {

    console.log(error);
    alert("Something went wrong.");

  }

}

  return (

    <div className="bg-white rounded-3xl shadow-md border border-purple-100 p-5 mt-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-lg font-semibold text-gray-800">
            📄 {fileName}
          </h3>

          <p className="text-sm text-purple-500 mt-1">
            ✓ Indexed successfully
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Uploaded on {uploadedAt}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={handleView}
            className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 transition"
          >
            👁 View
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition"
          >
            {deleting ? "Deleting..." : "🗑 Delete"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default MemoryItem;