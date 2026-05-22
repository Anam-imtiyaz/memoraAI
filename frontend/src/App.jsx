import { useEffect, useState } from "react";
import MemoryUpload from "./components/MemoryUpload";
import MemoryItem from "./components/MemoryItem";

function App() {
const [memories, setMemories] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8081/memories")
    .then(res => res.json())
    .then(data => setMemories(data))
    .catch(err => console.log(err));

}, []);
  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800">
          MemoraAI
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Search your memories by meaning.
        </p>

        <MemoryUpload setMemories={setMemories} />
       {memories.length === 0 ? (

  <div className="bg-white p-6 rounded-2xl mt-6 text-center">
    <p className="text-gray-700 font-medium">
      No memories yet
    </p>

    <p className="text-sm text-gray-400 mt-2">
      Upload something to get started
    </p>
  </div>

) : (

  memories.map((item, index) => (
    <MemoryItem
      key={index}
      fileName={item.fileName}
      uploadedAt={item.uploadedAt}
      onDelete={async () => {

        await fetch(
          `http://localhost:8081/memories/${index}`,
          {
            method: "DELETE"
          }
        );

            setMemories(
              memories.filter((_, i) => i !== index)
            );
          }}
        />
      ))

    )}

      </div>
    </div>
  );
}

export default App;