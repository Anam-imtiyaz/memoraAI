import { useEffect, useState } from "react";
import MemoryUpload from "./components/MemoryUpload";
import MemoryItem from "./components/MemoryItem";

function App() {

  const [memories, setMemories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {

    let url = "http://localhost:8081/memories";

    if (searchText.trim() !== "") {
      url = `http://localhost:8081/memories/search?query=${searchText}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMemories(data))
      .catch((err) => console.log(err));

  }, [searchText]);

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

        <input
          type="text"
          placeholder="Search memories..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full mt-6 p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        />

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

          memories.map((item) => (

            <MemoryItem
              key={item.fileName}
              fileName={item.fileName}
              uploadedAt={item.uploadedAt}
              onDelete={async () => {

                try {

                  await fetch(
                    `http://localhost:8081/memories/${item.fileName}`,
                    {
                      method: "DELETE"
                    }
                  );

                  setMemories((old) =>
                    old.filter(
                      (memory) => memory.fileName !== item.fileName
                    )
                  );

                } catch (error) {

                  console.log(error);

                }

              }}
            />

          ))

        )}

      </div>

    </div>
  );
}

export default App;