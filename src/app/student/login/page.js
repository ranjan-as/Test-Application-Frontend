"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../../components/css/login.css";

// Student Login Page
export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("studentSessionId")
    ) {
      router.replace("/student/dashboard");
    }
    // Prevent back navigation to login page
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
    return () => {
      window.onpopstate = null;
    };
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:4000/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Save sessionId to localStorage for dashboard auth
      if (data.student) {
        localStorage.setItem("studentSessionId", email);
        localStorage.setItem("studentEmail", email); // Store email for dashboard and test pages
        setSuccess("Login successful! Redirecting to dashboard...");
        setTimeout(() => router.replace("/student/dashboard"), 1000);
      } else {
        throw new Error("No student returned from server.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <Image
          src="/logo.png"
          alt="Logo"
          className="login-logo"
          width={80}
          height={80}
        />
        <h2>Student Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginTop: 8 }}>{success}</div>
        )}
      </div>
    </div>
  );
}
