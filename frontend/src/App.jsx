import MemoryUpload from "./components/MemoryUpload";
import MemoryItem from "./components/MemoryItem";

function App() {
  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800">
          MemoraAI
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Search your memories by meaning.
        </p>

        <MemoryUpload />
        <MemoryItem />

      </div>
    </div>
  );
}

export default App;