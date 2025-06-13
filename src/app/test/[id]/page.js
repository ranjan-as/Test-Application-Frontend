"use client";
import { use, useState, useEffect } from "react";
import TakeTest from "../../components/Test/TakeTest";

export default function TestPage({ params }) {
  const { id } = use(params);
  const [test, setTest] = useState(null);
  const [studentEmail, setStudentEmail] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/student/tests")
      .then((res) => res.json())
      .then((tests) => {
        const found = tests.find((t) => String(t.id) === String(id));
        setTest(found);
      });
  }, [id]);

  const handleSubmitTest = async (answers) => {
    const res = await fetch("http://localhost:4000/api/student/tests/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentEmail, testId: id, answers }),
    });
    const data = await res.json();
    // Calculate summary
    const answered = answers.filter((a) => a && a.trim() !== "").length;
    const total = test.questions.length;
    setSummary({ answered, unanswered: total - answered });
    setMessage(data.message);
    // Auto-logout after 30 seconds
    setTimeout(() => {
      localStorage.clear();
      window.location.replace("/student/login");
    }, 30000);
  };

  if (!test) return <main>Loading...</main>;

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Test: {test.name}</h1>
      <input
        type="email"
        placeholder="Student Email (for demo)"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
        style={{ marginBottom: 16 }}
        disabled={!!summary}
      />
      {/* Hide TakeTest after submission/summary */}
      {!summary && <TakeTest test={test} onSubmit={handleSubmitTest} />}
      {summary && (
        <div
          style={{
            margin: "1rem 0",
            color: "#333",
            background: "#f8f9fa",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <div>
            <b>Test submitted!</b>
          </div>
          <div>Questions answered: {summary.answered}</div>
          <div>Questions left/unanswered: {summary.unanswered}</div>
          <button
            onClick={() => window.location.replace("/")}
            style={{ marginTop: 12 }}
          >
            Go to Home
          </button>
        </div>
      )}
      {message && !summary && (
        <div style={{ color: "green", margin: "1rem 0" }}>{message}</div>
      )}
    </main>
  );
}
