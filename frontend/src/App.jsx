import { useEffect, useState } from "react";
import MemoryUpload from "./components/MemoryUpload";
import MemoryItem from "./components/MemoryItem";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800">
          MemoraAI
        </h1>

        <p className="text-gray-500 mt-2">
          Search your memories by meaning.
        </p>

        <p className="mt-2 text-green-600">
          {message}
        </p>

        <MemoryUpload />
        <MemoryItem />

      </div>
    </div>
  );
}

export default App;