// Student Take Test Component
import React, { useState, useEffect, useRef } from "react";
import "../../css/TakeTest.css";

const STATUS = {
  NOT_VISITED: "not-visited",
  NOT_ANSWERED: "not-answered",
  ANSWERED: "answered",
  REVIEW: "review",
  ANSWERED_REVIEW: "answered-review",
};

function getInitialStatuses(length) {
  return Array(length).fill(STATUS.NOT_VISITED);
}

const TakeTest = ({ test, onSubmit }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(test.questions.length).fill(""));
  const [statuses, setStatuses] = useState(
    getInitialStatuses(test.questions.length)
  );
  const [marked, setMarked] = useState(
    Array(test.questions.length).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(
    parseInt(test.duration || 60) * 60 || 3600
  );
  const timerRef = useRef();

  // Timer logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Format timer
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Palette status update
  useEffect(() => {
    setStatuses((prev) => {
      const updated = [...prev];
      if (updated[current] === STATUS.NOT_VISITED) {
        updated[current] = answers[current]
          ? STATUS.ANSWERED
          : STATUS.NOT_ANSWERED;
      }
      return updated;
    });
    // eslint-disable-next-line
  }, [current]);

  const handleAnswerChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = value;
    setAnswers(updated);
    setStatuses((prev) => {
      const updatedStatus = [...prev];
      updatedStatus[idx] = value
        ? marked[idx]
          ? STATUS.ANSWERED_REVIEW
          : STATUS.ANSWERED
        : marked[idx]
        ? STATUS.REVIEW
        : STATUS.NOT_ANSWERED;
      return updatedStatus;
    });
  };

  const handleMarkForReview = () => {
    setMarked((prev) => {
      const updated = [...prev];
      updated[current] = true;
      return updated;
    });
    setStatuses((prev) => {
      const updated = [...prev];
      updated[current] = answers[current]
        ? STATUS.ANSWERED_REVIEW
        : STATUS.REVIEW;
      return updated;
    });
    handleNext();
  };

  const handleClearResponse = () => {
    handleAnswerChange(current, "");
  };

  const handleNext = () => {
    if (current < test.questions.length - 1) setCurrent(current + 1);
  };
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handlePaletteClick = (idx) => {
    setCurrent(idx);
  };

  const handleAutoSubmit = () => {
    onSubmit({
      answers,
      subject: test.subject,
      language: test.language,
      exam: test.exam,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      answers,
      subject: test.subject,
      language: test.language,
      exam: test.exam,
    });
  };

  // Scroll to top/bottom
  const mainRef = useRef();
  const scrollToTop = () =>
    mainRef.current && mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    mainRef.current &&
    mainRef.current.scrollTo({ top: 9999, behavior: "smooth" });

  // Palette legend
  const legend = [
    { status: STATUS.NOT_VISITED, label: "Not Visited", color: "#e0e0e0" },
    { status: STATUS.NOT_ANSWERED, label: "Not Answered", color: "#f8d7da" },
    { status: STATUS.ANSWERED, label: "Answered", color: "#d4edda" },
    { status: STATUS.REVIEW, label: "Marked for Review", color: "#ffeeba" },
    {
      status: STATUS.ANSWERED_REVIEW,
      label: "Answered & Review",
      color: "#b8daff",
    },
  ];

  return (
    <div className="nta-take-test-boxy-layout">
      {/* Timer */}
      <div className="nta-timer-box">{formatTime(timeLeft)}</div>
      {/* Palette */}
      <div className="nta-palette-box">
        <div className="nta-palette-title">Question Palette</div>
        <div className="nta-palette-grid">
          {test.questions.map((_, idx) => (
            <button
              key={idx}
              className={`nta-palette-btn nta-palette-${statuses[idx]}${
                current === idx ? " nta-palette-current" : ""
              }`}
              style={{ borderRadius: 4 }}
              onClick={() => handlePaletteClick(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <div className="nta-palette-legend">
          {legend.map((l) => (
            <div key={l.status} className="nta-palette-legend-item">
              <span
                className="nta-palette-legend-color"
                style={{ background: l.color }}
              ></span>
              {l.label}
            </div>
          ))}
        </div>
      </div>
      {/* Main Question Area */}
      <div className="nta-question-box" ref={mainRef}>
        <div style={{ marginBottom: 16, fontWeight: 500 }}>
          {localStorage.getItem("studentEmail") && (
            <div>Email: {localStorage.getItem("studentEmail")}</div>
          )}
          {test.exam && <div>Exam: {test.exam}</div>}
          {test.subject && <div>Subject: {test.subject}</div>}
          {test.language && <div>Language: {test.language}</div>}
        </div>
        <div className="nta-question-heading">
          Q{current + 1}: {test.questions[current].text}
        </div>
        {test.questions[current].type === "mcq" &&
        Array.isArray(test.questions[current].options) ? (
          test.questions[current].options.map((opt, i) => (
            <label key={i} className="nta-mcq-label">
              <input
                type="radio"
                name={`q${current}`}
                value={opt}
                checked={answers[current] === opt}
                onChange={() => handleAnswerChange(current, opt)}
              />
              {opt}
            </label>
          ))
        ) : (
          <textarea
            name={`q${current}`}
            value={answers[current]}
            onChange={(e) => handleAnswerChange(current, e.target.value)}
            className="nta-question-textarea"
          />
        )}
        <div className="nta-question-actions">
          <button
            type="button"
            className="nta-btn"
            onClick={handlePrev}
            disabled={current === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="nta-btn"
            onClick={handleClearResponse}
          >
            Clear Response
          </button>
          <button
            type="button"
            className="nta-btn"
            onClick={handleMarkForReview}
          >
            Mark for Review & Next
          </button>
          <button
            type="button"
            className="nta-btn"
            onClick={handleNext}
            disabled={current === test.questions.length - 1}
          >
            Save & Next
          </button>
          <button
            type="submit"
            className="nta-btn nta-btn-submit"
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        </div>
        <div className="nta-scroll-actions">
          <button type="button" className="nta-btn" onClick={scrollToTop}>
            ⬆ Top
          </button>
          <button type="button" className="nta-btn" onClick={scrollToBottom}>
            ⬇ Bottom
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
