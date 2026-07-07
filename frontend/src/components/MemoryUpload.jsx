import { useState } from "react";

function MemoryUpload({ setMemories }) {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  function handleFileChange(event) {
    setSelectedFiles(Array.from(event.target.files));
  }

  async function handleUpload() {

    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setUploading(true);

    const token = localStorage.getItem("token");

    try {

      for (const file of selectedFiles) {

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "http://localhost:8081/hello",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData
          }
        );

        if (!response.ok) {
          alert("Failed to upload " + file.name);
          continue;
        }

        setMemories(old => [
          {
            fileName: file.name,
            uploadedAt: "Just now"
          },
          ...old
        ]);

      }

      setSelectedFiles([]);
      document.getElementById("memoryFile").value = "";

    } catch (error) {

      console.log(error);
      alert("Upload failed.");

    }

    setUploading(false);

  }

  return (

    <div className="bg-white rounded-3xl border border-purple-100 shadow-lg p-8">

      <div className="mb-6">

        <h2 className="text-2xl font-semibold text-gray-800">
          Upload Documents
        </h2>

        <p className="text-gray-500 mt-2">
          Upload one or more PDFs or images.
        </p>

      </div>

      <label
        htmlFor="memoryFile"
        className="block border-2 border-dashed border-purple-300 rounded-3xl p-10 text-center cursor-pointer hover:bg-purple-50 transition"
      >

        <div className="text-5xl mb-4">
          📄
        </div>

        <h3 className="text-lg font-semibold text-gray-700">
          Drag & Drop Files
        </h3>

        <p className="text-gray-500 mt-2">
          or click here to browse
        </p>

        <input
          id="memoryFile"
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />

      </label>

      {selectedFiles.length > 0 && (

        <div className="mt-6">

          <h3 className="font-semibold text-gray-700 mb-3">
            Selected Files
          </h3>

          <div className="space-y-2">

            {selectedFiles.map((file, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-purple-50 rounded-xl px-4 py-3"
              >

                <span className="text-gray-700">
                  {file.name}
                </span>

                <span className="text-sm text-purple-600">
                  {(file.size / 1024).toFixed(1)} KB
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full mt-8 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition disabled:bg-gray-300"
      >

        {uploading ? "Uploading..." : "Upload Files"}

      </button>

    </div>

  );

}

export default MemoryUpload;