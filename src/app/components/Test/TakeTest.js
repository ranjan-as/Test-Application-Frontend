// Student Take Test Component
import React, { useState } from "react";
import "../../css/TakeTest.css";

const TakeTest = ({ test, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(test.questions.length).fill(""));

  const handleAnswerChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = value;
    setAnswers(updated);
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

  return (
    <div className="take-test-panel">
      {/* Show student email and test meta at the top */}
      <div style={{ marginBottom: 16, fontWeight: 500 }}>
        {localStorage.getItem("studentEmail") && (
          <div>Email: {localStorage.getItem("studentEmail")}</div>
        )}
        {test.exam && <div>Exam: {test.exam}</div>}
        {test.subject && <div>Subject: {test.subject}</div>}
        {test.language && <div>Language: {test.language}</div>}
      </div>
      <div className="take-test-heading">{test.name}</div>
      <div>
        <form className="take-test-form" onSubmit={handleSubmit}>
          {test.questions.map((q, idx) => (
            <div key={idx}>
              <div>{q.text}</div>
              {q.type === "mcq" && Array.isArray(q.options) ? (
                q.options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt}
                      checked={answers[idx] === opt}
                      onChange={() => handleAnswerChange(idx, opt)}
                    />
                    {opt}
                  </label>
                ))
              ) : (
                <textarea
                  name={`q${idx}`}
                  value={answers[idx]}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default TakeTest;
