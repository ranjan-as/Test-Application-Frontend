import React, { useState, useEffect } from "react";
import "./TestSelect.css";

export default function TestSelect({ onSelect, tests }) {
  const [now, setNow] = useState(new Date());
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Extract unique exams and test names from API data
  const exams = Array.from(
    new Set((tests || []).map((t) => t.exam).filter(Boolean))
  );
  const testNames = Array.from(
    new Set(
      (tests || [])
        .filter((t) => !selectedExam || t.exam === selectedExam)
        .map((t) => t.name)
        .filter(Boolean)
    )
  );

  // Filter tests by selected exam and test name
  const filteredTests = tests.filter(
    (t) =>
      (!selectedExam || t.exam === selectedExam) &&
      (!selectedTest || t.name === selectedTest)
  );

  // Group tests by status
  const upcoming = filteredTests.filter((t) => t.status === "upcoming");
  const missed = filteredTests.filter((t) => t.status === "missed");
  const appeared = filteredTests.filter(
    (t) => t.status === "completed" || t.status === "active"
  );

  return (
    <div className="nta-test-select-container">
      <h2 className="nta-test-select-title">Select Your Test</h2>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <select
          className="form-control"
          value={selectedExam}
          onChange={(e) => {
            setSelectedExam(e.target.value);
            setSelectedTest("");
          }}
        >
          <option value="">All Exams</option>
          {exams.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
        <select
          className="form-control"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="">All Test Names</option>
          {testNames.map((tn) => (
            <option key={tn} value={tn}>
              {tn}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div className="nta-test-status-card">
          <div className="nta-test-status-title">Upcoming Exams</div>
          <div className="nta-test-status-count">{upcoming.length}</div>
        </div>
        <div className="nta-test-status-card">
          <div className="nta-test-status-title">Missed Exams</div>
          <div className="nta-test-status-count">{missed.length}</div>
        </div>
        <div className="nta-test-status-card">
          <div className="nta-test-status-title">Appeared Exams</div>
          <div className="nta-test-status-count">{appeared.length}</div>
        </div>
      </div>
      <ul className="nta-test-list">
        {filteredTests.map((test) => {
          const isActive = test.status === "active";
          return (
            <li
              key={test.id}
              className={`nta-test-item ${isActive ? "active" : ""} ${
                test.status
              }`}
              style={
                isActive ? { cursor: "pointer", background: "#f0f8ff" } : {}
              }
              onClick={isActive ? () => onSelect(test) : undefined}
            >
              <div className="nta-test-info">
                <span
                  className="nta-test-name"
                  style={
                    isActive
                      ? { textDecoration: "underline", color: "#0070f3" }
                      : {}
                  }
                >
                  {test.name}
                </span>
                <span className="nta-test-date">
                  {test.exam && <b>{test.exam}</b>} {test.date} {test.time}
                </span>
              </div>
              {test.status === "missed" && (
                <span className="nta-test-badge missed">Missed</span>
              )}
              {test.status === "reappear" && (
                <span className="nta-test-badge reappear">Re-Appear</span>
              )}
              {test.status === "completed" && (
                <span className="nta-test-badge completed">Completed</span>
              )}
              {isActive && (
                <button
                  className="nta-test-start-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(test);
                  }}
                >
                  Start Test
                </button>
              )}
              {!isActive && test.status === "upcoming" && (
                <span className="nta-test-badge upcoming">Upcoming</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
