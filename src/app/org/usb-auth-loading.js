"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrgUsbAuthLoading() {
  const router = useRouter();
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute

  useEffect(() => {
    // Get sessionId from localStorage or cookie (set after org login)
    const sessionId = localStorage.getItem("orgSessionId");
    if (!sessionId) {
      setError("No session found. Please login again.");
      setStatus("error");
      return;
    }

    let timeoutId;
    let intervalId;
    let isActive = true;

    const pollStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/org/session-status?sessionId=${sessionId}`
        );
        const data = await res.json();
        if (!isActive) return;
        if (data.usbVerified) {
          setStatus("verified");
          if (timeLeft > 0) {
            setTimeout(() => router.push("/org/dashboard"), 1000);
          }
        } else if (data.usbAuthFailed) {
          setError(
            data.usbAuthFailReason || "Unauthorized. USB authentication failed."
          );
          setStatus("error");
        } else {
          timeoutId = setTimeout(pollStatus, 2000);
        }
      } catch (err) {
        setError("Error connecting to server.");
        setStatus("error");
      }
    };

    pollStatus();

    intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus("timeout");
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [router, timeLeft]);

  if (status === "pending") {
    return (
      <div className="usb-auth-loading">
        <h2>Waiting for USB Authentication...</h2>
        <p>
          Please insert your authorized USB pendrive and run the authentication
          app.
          <br />
          <b>Time left: {timeLeft} seconds</b>
        </p>
        <div className="loader"></div>
      </div>
    );
  }
  if (status === "verified") {
    return (
      <div className="usb-auth-loading">
        <h2>USB Verified!</h2>
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }
  if (status === "timeout") {
    return (
      <div className="usb-auth-loading error">
        <h2>Authentication Timed Out</h2>
        <p>USB authentication was not completed in time. Please try again.</p>
        <button onClick={() => router.push("/org/login")}>Back to Login</button>
      </div>
    );
  }
  return (
    <div className="usb-auth-loading error">
      <h2>Authentication Failed</h2>
      <p>{error}</p>
      <button onClick={() => router.push("/org/login")}>Back to Login</button>
    </div>
  );
}

// Simple CSS for loader
// Add this to your global CSS or module
// .usb-auth-loading { text-align: center; margin-top: 100px; }
// .usb-auth-loading .loader { margin: 30px auto; border: 8px solid #f3f3f3; border-top: 8px solid #3498db; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite; }
// @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
