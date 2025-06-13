"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import CreateTestForm from "./CreateTestForm";

// Organization Dashboard Page
export default function OrgDashboard() {
  const [tests, setTests] = useState([]);
  const [orgEmail, setOrgEmail] = useState(""); // TODO: Replace with real auth
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchTests = useCallback(async () => {
    if (!orgEmail) return;
    const res = await fetch(
      `http://localhost:4000/api/org/tests?orgEmail=${orgEmail}`
    );
    const data = await res.json();
    setTests(data);
  }, [orgEmail]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  useEffect(() => {
    // If not logged in, redirect to login
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("orgSessionId")
    ) {
      router.replace("/org/login");
    }
  }, [router]);

  const handleCreateTest = async (testObj) => {
    setMessage("");
    const res = await fetch("http://localhost:4000/api/org/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgEmail, test: testObj }),
    });
    const data = await res.json();
    setMessage(data.message);
    fetchTests();
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Organization Dashboard</h1>
      <button
        style={{ float: "right", marginBottom: 16 }}
        onClick={() => {
          localStorage.clear();
          window.location.replace("/org/login");
        }}
      >
        Logout
      </button>
      <input
        type="email"
        placeholder="Org Email (for demo)"
        value={orgEmail}
        onChange={(e) => setOrgEmail(e.target.value)}
      />
      {/* Create Test Form Integration */}
      <CreateTestForm onSubmit={handleCreateTest} />
      {message && (
        <div style={{ color: "green", margin: "1rem 0" }}>{message}</div>
      )}
      <h2>Existing Tests</h2>
      <ul>
        {tests.map((t) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </main>
  );
}
