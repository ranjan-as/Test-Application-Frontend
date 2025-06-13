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
    onSubmit(answers);
  };

  return (
    <div className="take-test-panel">
      <div className="take-test-heading">{test.name}</div>
      <div>
        <form className="take-test-form" onSubmit={handleSubmit}>
          {test.questions.map((q, idx) => (
            <div className="form-group" key={idx}>
              <label>{q.text}</label>
              <input
                type="text"
                className="form-control"
                value={answers[idx]}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                placeholder="Your answer"
                required
              />
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
