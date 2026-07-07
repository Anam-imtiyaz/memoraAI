import { useState } from "react";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const token = await response.text();

      if (
        token === "User not found" ||
        token === "Wrong password"
      ) {

        alert(token);
        setLoading(false);
        return;

      }

      localStorage.setItem("token", token);

      onLogin();

    } catch (error) {

      console.log(error);
      alert("Unable to login.");

    }

    setLoading(false);

  }

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8">

      <h2 className="text-3xl font-bold text-gray-800">
        Welcome Back
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Login to continue to MemoraAI.
      </p>

      <div className="space-y-5">

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />

        </div>

      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-purple-500 hover:bg-purple-600 text-white py-3 font-semibold transition disabled:bg-gray-300"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>

  );

}

export default Login;