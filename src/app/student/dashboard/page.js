"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Student Dashboard Page
export default function StudentDashboard() {
  const [tests, setTests] = useState([]);
  const [studentEmail, setStudentEmail] = useState(""); // TODO: Replace with real auth
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/api/student/tests")
      .then((res) => res.json())
      .then(setTests);
  }, []);

  useEffect(() => {
    // If not logged in, redirect to login
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("studentSessionId")
    ) {
      router.replace("/student/login");
    }
  }, [router]);

  const handleTakeTest = (testId) => {
    router.push(`/test/${testId}`);
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Student Dashboard</h1>
      <button
        style={{ float: "right", marginBottom: 16 }}
        onClick={() => {
          localStorage.clear();
          window.location.replace("/student/login");
        }}
      >
        Logout
      </button>
      <input
        type="email"
        placeholder="Student Email"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {message && (
        <div style={{ color: "green", margin: "1rem 0" }}>{message}</div>
      )}
      <h2>Available Tests</h2>
      <ul>
        {tests.map((t) => (
          <li key={t.id}>
            {t.name}
            <button
              style={{ marginLeft: 12 }}
              onClick={() => handleTakeTest(t.id)}
            >
              Take Test
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
