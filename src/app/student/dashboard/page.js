"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TestSelect from "../../components/Test/TestSelect";
import "../../components/Test/TestSelect.css";

// Student Dashboard Page
export default function StudentDashboard() {
  const [tests, setTests] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  // Hydration-safe state for client-only code
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Fetch student email from localStorage/session
  const [studentEmail, setStudentEmail] = useState("");
  useEffect(() => {
    const email = localStorage.getItem("studentEmail") || "";
    setStudentEmail(email);
  }, []);

  const handleTakeTest = (test) => {
    router.push(`/test/${test.id}`);
  };

  return (
    <main style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h1>Student Dashboard</h1>
      {isClient && (
        <button
          style={{ float: "right", marginBottom: 16 }}
          onClick={() => {
            localStorage.clear();
            window.location.replace("/student/login");
          }}
        >
          Logout
        </button>
      )}
      {/* Show student email if available */}
      {studentEmail && (
        <div style={{ marginBottom: 16, fontWeight: 500 }}>
          Email: {studentEmail}
        </div>
      )}
      {message && (
        <div style={{ color: "green", margin: "1rem 0" }}>{message}</div>
      )}
      <TestSelect tests={tests} onSelect={handleTakeTest} />
    </main>
  );
}
