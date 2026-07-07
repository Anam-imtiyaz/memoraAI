import { useState } from "react";

function Signup({ onSignup }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch("http://localhost:8081/auth/signup", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })

      });

      const message = await response.text();

      alert(message);

      if (message === "Signup successful") {
        onSignup();
      }

    } catch (error) {

      console.log(error);
      alert("Unable to create account.");

    }

    setLoading(false);

  }

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8">

      <h2 className="text-3xl font-bold text-gray-800">
        Create Account
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Start organizing your documents with MemoraAI.
      </p>

      <div className="space-y-5">

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />

        </div>

      </div>

      <button
        onClick={handleSignup}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-purple-500 hover:bg-purple-600 text-white py-3 font-semibold transition disabled:bg-gray-300"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </div>

  );

}

export default Signup;