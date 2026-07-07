import { useEffect, useState } from "react";
import MemoryUpload from "./components/MemoryUpload";
import MemoryItem from "./components/MemoryItem";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AskQuestion from "./components/AskQuestion";

function App() {

  const [memories, setMemories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const [showSignup, setShowSignup] = useState(true);

  useEffect(() => {

    if (!loggedIn) return;

    const token = localStorage.getItem("token");

    let url = "http://localhost:8081/memories";

    if (searchText.trim() !== "") {
      url = `http://localhost:8081/memories/search?query=${searchText}`;
    }

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setMemories(data))
      .catch(console.log);

  }, [loggedIn, searchText]);

  function logout() {

    localStorage.removeItem("token");
    setLoggedIn(false);
    setMemories([]);

  }

  if (!loggedIn) {

    return (

      <div className="min-h-screen bg-[#F5F2FB] flex items-center justify-center px-8">

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <h1 className="text-6xl font-bold text-gray-800">
              MemoraAI
            </h1>

            <p className="text-2xl text-purple-600 mt-5 font-medium">
              Your Personal AI Knowledge Assistant
            </p>

            <p className="text-gray-600 mt-8 text-lg leading-8 max-w-xl">

              Upload your documents.

              Search through them instantly.

              Ask questions in natural language.

              Get answers powered by AI.

            </p>

            <div className="grid grid-cols-2 gap-5 mt-12">

              <div className="bg-white rounded-3xl border border-purple-100 p-6">

                <h3 className="font-semibold text-lg">
                  Upload
                </h3>

                <p className="text-gray-500 mt-2">
                  PDFs and Images
                </p>

              </div>

              <div className="bg-white rounded-3xl border border-purple-100 p-6">

                <h3 className="font-semibold text-lg">
                  AI Search
                </h3>

                <p className="text-gray-500 mt-2">
                  Find answers instantly
                </p>

              </div>

              <div className="bg-white rounded-3xl border border-purple-100 p-6">

                <h3 className="font-semibold text-lg">
                  Secure
                </h3>

                <p className="text-gray-500 mt-2">
                  JWT Authentication
                </p>

              </div>

              <div className="bg-white rounded-3xl border border-purple-100 p-6">

                <h3 className="font-semibold text-lg">
                  Multiple Files
                </h3>

                <p className="text-gray-500 mt-2">
                  Upload together
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            {showSignup ? (

              <>

                <Signup
                  onSignup={() => setShowSignup(false)}
                />

                <p className="text-center mt-6 text-gray-600">

                  Already have an account?

                  <button
                    onClick={() => setShowSignup(false)}
                    className="ml-2 text-purple-600 hover:underline"
                  >
                    Login
                  </button>

                </p>

              </>

            ) : (

              <>

                <Login
                  onLogin={() => setLoggedIn(true)}
                />

                <p className="text-center mt-6 text-gray-600">

                  Don't have an account?

                  <button
                    onClick={() => setShowSignup(true)}
                    className="ml-2 text-purple-600 hover:underline"
                  >
                    Sign Up
                  </button>

                </p>

              </>

            )}

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#F5F2FB] px-8 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold text-gray-800">
              MemoraAI
            </h1>

            <p className="text-gray-500 mt-2">
              Your Personal AI Knowledge Assistant
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-white border border-red-200 text-red-600 px-5 py-2 rounded-xl hover:bg-red-50"
          >
            Logout
          </button>

        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Upload Documents
              </h2>

              <MemoryUpload
                setMemories={setMemories}
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Search Documents
              </h2>

              <input
                type="text"
                placeholder="Search documents..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                className="w-full bg-white border border-purple-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-purple-300"
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Your Documents
              </h2>
                            {memories.length === 0 ? (

                <div className="bg-white rounded-2xl border border-purple-100 p-8 text-center">

                  <p className="text-gray-500">
                    No documents uploaded yet.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {memories.map((item) => (

                    <MemoryItem
                      key={item.fileName}
                      fileName={item.fileName}
                      uploadedAt={item.uploadedAt}
                      onDelete={async () => {

                        const token = localStorage.getItem("token");

                        try {

                          await fetch(
                            `http://localhost:8081/memories/${item.fileName}`,
                            {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            }
                          );

                          setMemories((old) =>
                            old.filter(
                              (memory) =>
                                memory.fileName !== item.fileName
                            )
                          );

                        } catch (error) {

                          console.log(error);

                        }

                      }}
                    />

                  ))}

                </div>

              )}

            </div>

          </div>

          {/* Right Side */}

          <div className="lg:col-span-3">

            <div className="sticky top-8">

              <AskQuestion />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;