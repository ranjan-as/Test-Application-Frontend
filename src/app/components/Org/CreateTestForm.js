// Organization Create Test Form Component
import React, { useState } from "react";
import "../../css/CreateTestForm.css";

const CreateTestForm = ({ onSubmit }) => {
  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([{ text: "" }]);

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].text = value;
    setQuestions(updated);
  };

  const addQuestion = () => setQuestions([...questions, { text: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: testName, questions });
    setTestName("");
    setQuestions([{ text: "" }]);
  };

  return (
    <div className="create-test-panel">
      <div className="create-test-heading">Create New Test</div>
      <div>
        <form className="create-test-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Test Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Test Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
            />
          </div>
          <label>Questions</label>
          {questions.map((q, idx) => (
            <div className="form-group" key={idx}>
              <input
                type="text"
                className="form-control"
                placeholder={`Question ${idx + 1}`}
                value={q.text}
                onChange={(e) => handleQuestionChange(idx, e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addQuestion}
          >
            Add Question
          </button>
          <button type="submit" className="btn btn-primary">
            Create Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestForm;
