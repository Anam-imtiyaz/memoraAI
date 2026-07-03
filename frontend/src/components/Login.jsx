import { useState } from "react";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {

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
        return;

      }

      localStorage.setItem("token", token);

      onLogin();

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-xl mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-xl mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-purple-300 hover:bg-purple-400 rounded-xl py-3"
      >
        Login
      </button>

    </div>

  );

}

export default Login;