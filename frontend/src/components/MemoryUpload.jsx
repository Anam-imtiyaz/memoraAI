import { useState } from "react";

function MemoryUpload({ setMemories }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleUpload() {

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8081/hello", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.text();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (!response.ok) {
        alert(data);
        setUploading(false);
        return;
      }

      setMemories(old => [
        {
          fileName: selectedFile.name,
          uploadedAt: "Just now"
        },
        ...old
      ]);

      setSelectedFile(null);
      document.getElementById("memoryFile").value = "";

    } catch (error) {

      console.log(error);
      alert("Upload failed.");

    }

    setUploading(false);

  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-200">

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Upload Memories
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Upload PDFs or screenshots
      </p>

      <label
        htmlFor="memoryFile"
        className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-10 bg-purple-50 cursor-pointer hover:bg-purple-100 transition"
      >

        <p className="text-gray-700 font-medium">
          Drag and drop files here
        </p>

        <p className="text-gray-400 text-sm mt-1">
          or click to browse PDFs and screenshots
        </p>

        <input
          id="memoryFile"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />

      </label>

      {selectedFile && (

        <div className="mt-4 p-3 rounded-xl bg-purple-50 border border-purple-100">

          <p className="text-sm text-gray-700 font-medium">
            Selected File
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {selectedFile.name}
          </p>

        </div>

      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 w-full py-3 rounded-xl bg-purple-200 hover:bg-purple-300 disabled:bg-gray-300 transition"
      >

        {uploading ? "Uploading..." : "Upload"}

      </button>

    </div>

  );
}

export default MemoryUpload;