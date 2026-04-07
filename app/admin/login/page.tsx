"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh", background: "#080808",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
    }}>
      <div style={{
        background: "#111", border: "1px solid #1e1e1e",
        borderRadius: "20px", padding: "48px 40px", width: "100%", maxWidth: "380px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>
            PUNCH <span style={{ color: "#FF0A2F" }}>TV</span>
          </span>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              style={{
                width: "100%", background: "#0d0d0d", border: "1px solid #1e1e1e",
                borderRadius: "10px", padding: "13px 16px", color: "#fff",
                fontSize: "15px", outline: "none", fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
            />
          </div>

          {error && <p style={{ color: "#FF0A2F", fontSize: "13px" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#333" : "#FF0A2F",
              color: "#fff", padding: "13px", borderRadius: "10px",
              border: "none", fontSize: "15px", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
