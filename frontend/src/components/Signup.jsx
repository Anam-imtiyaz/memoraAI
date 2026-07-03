import { useState } from "react";

function Signup({ onSignup }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {

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

    }

  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        Create Account
      </h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full border p-3 rounded-xl mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        onClick={handleSignup}
        className="w-full bg-purple-300 hover:bg-purple-400 rounded-xl py-3"
      >
        Sign Up
      </button>

    </div>

  );

}

export default Signup;