import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const createRepo = async () => {
    if (!username) {
      setStatus("Enter a username bro 😅");
      return;
    }

    setStatus("Creating repo... ⏳");

    try {
      const res = await fetch("/api/create-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus(`✅ Repo created: ${data.repo}`);
      } else {
        setStatus("❌ " + JSON.stringify(data));
      }
    } catch (err) {
      setStatus("Server error 💀");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Advaya Repo Creator 🚀</h1>

      <input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />

      <button onClick={createRepo} style={{ padding: 10 }}>
        Create Repo
      </button>

      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}