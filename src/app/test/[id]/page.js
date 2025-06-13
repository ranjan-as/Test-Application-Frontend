"use client";
import { use, useState, useEffect } from "react";
import TakeTest from "../../components/Test/TakeTest";
import TestInstructions from "../instructions";

export default function TestPage({ params }) {
  const { id } = use(params);
  const [test, setTest] = useState(null);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  // Fetch student email from localStorage/session
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("studentEmail") || "";
    setStudentEmail(email);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/student/tests")
      .then((res) => res.json())
      .then((tests) => {
        const found = tests.find((t) => String(t.id) === String(id));
        setTest(found);
      });
  }, [id]);

  const handleSubmitTest = async (submission) => {
    // Fetch email from localStorage/session
    const studentEmail = localStorage.getItem("studentEmail") || "";
    const res = await fetch("http://localhost:4000/api/student/tests/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentEmail,
        testId: id,
        answers: submission.answers,
      }),
    });
    const data = await res.json();
    // Calculate summary
    const answered = (submission.answers || []).filter(
      (a) => a && a.trim() !== ""
    ).length;
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
      {/* Show student email if available */}
      {studentEmail && (
        <div style={{ marginBottom: 16, fontWeight: 500 }}>
          Email: {studentEmail}
        </div>
      )}
      {showInstructions ? (
        <TestInstructions onAcknowledge={() => setShowInstructions(false)} />
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
