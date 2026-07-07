import { useState } from "react";

function AskQuestion() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function askAI() {

    if (question.trim() === "") return;

    const currentQuestion = question;

    setMessages(old => [
      ...old,
      {
        type: "user",
        text: currentQuestion
      }
    ]);

    setQuestion("");
    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const lower = currentQuestion.toLowerCase();

      const isDocumentSearch =
        lower.startsWith("where") ||
        lower.startsWith("find") ||
        lower.startsWith("show") ||
        lower.startsWith("open");

      if (isDocumentSearch) {

        const response = await fetch(
          "http://localhost:8081/find-document",
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
              Authorization: `Bearer ${token}`
            },
            body: currentQuestion
          }
        );

        const data = await response.json();

        setMessages(old => [
          ...old,
          {
            type: "ai",
            text: data.message,
            documents: data.documents || []
          }
        ]);

      } else {

        const response = await fetch(
          "http://localhost:8081/ask",
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
              Authorization: `Bearer ${token}`
            },
            body: currentQuestion
          }
        );

        const answer = await response.text();

        setMessages(old => [
          ...old,
          {
            type: "ai",
            text: answer
          }
        ]);

      }

    } catch (error) {

      console.log(error);

      setMessages(old => [
        ...old,
        {
          type: "ai",
          text: "Something went wrong."
        }
      ]);

    }

    setLoading(false);

  }

  return (

    <div className="bg-white rounded-3xl shadow-md border border-purple-100 p-6">

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Ask MemoraAI
      </h2>

      <p className="text-gray-500 mb-6">
        Ask anything about your uploaded documents.
      </p>

      <div className="space-y-4 max-h-[500px] overflow-y-auto mb-6">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.type === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                message.type === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-50 border border-purple-100 text-gray-800"
              }`}
            >

              {message.type === "ai" && (

                <p className="text-sm font-semibold text-purple-600 mb-2">
                  MemoraAI
                </p>

              )}

              <p className="whitespace-pre-wrap leading-7">
                {message.text}
              </p>
                            {message.documents &&

                message.documents.map((file, index) => (

                  <button
                    key={index}
                    onClick={async () => {

                      try {

                        const token = localStorage.getItem("token");

                        const response = await fetch(
                          `http://localhost:8081/view/${encodeURIComponent(file)}`,
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

                        const url =
                          window.URL.createObjectURL(blob);

                        window.open(url, "_blank");

                      } catch (error) {

                        console.log(error);

                      }

                    }}
                    className="block mt-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
                  >

                    Open {file}

                  </button>

                ))

              }

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-purple-50 border border-purple-100 rounded-2xl px-5 py-4">

              <p className="text-purple-600 font-medium">
                Thinking...
              </p>

            </div>

          </div>

        )}

      </div>

      <div className="flex gap-3">

        <textarea
          rows={2}
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 rounded-2xl border border-purple-200 p-4 outline-none resize-none focus:ring-2 focus:ring-purple-300"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="px-8 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition disabled:bg-gray-300"
        >
          Ask
        </button>

      </div>

    </div>

  );

}

export default AskQuestion;