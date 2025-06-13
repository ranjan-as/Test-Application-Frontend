// Organization Create Test Form Component
import React, { useState, useEffect } from "react";
import "../../css/CreateTestForm.css";

const CreateTestForm = ({ onSubmit }) => {
  const [isClient, setIsClient] = useState(false);
  const [testName, setTestName] = useState("");
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(""); // in minutes
  const [entryWindow, setEntryWindow] = useState(""); // in minutes
  const [questions, setQuestions] = useState([{ text: "" }]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].text = value;
    setQuestions(updated);
  };

  const handleQuestionTypeChange = (idx, type) => {
    const updated = [...questions];
    updated[idx].type = type;
    if (type === "mcq" && !updated[idx].options) {
      updated[idx].options = ["", "", "", ""];
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () =>
    setQuestions([...questions, { text: "", type: "text" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: testName,
      exam,
      subject,
      language,
      date,
      time,
      duration,
      entryWindow,
      questions,
    });
    setTestName("");
    setExam("");
    setSubject("");
    setLanguage("");
    setDate("");
    setTime("");
    setDuration("");
    setEntryWindow("");
    setQuestions([{ text: "" }]);
  };

  if (!isClient) return null;

  return (
    <div className="create-test-panel">
      <div className="create-test-heading">Create New Test</div>
      <div>
        <form className="create-test-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exam</label>
            <input
              type="text"
              className="form-control"
              placeholder="Exam Name"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              className="form-control"
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 180 for 3 hours"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label>Entry Window (minutes after start)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 15"
              value={entryWindow}
              onChange={(e) => setEntryWindow(e.target.value)}
              min={0}
              required
            />
          </div>
          <label>Questions</label>
          {questions.map((q, idx) => (
            <div className="form-group" key={idx}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Question ${idx + 1}`}
                  value={q.text}
                  onChange={(e) => handleQuestionChange(idx, e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <select
                  className="form-control"
                  value={q.type || "text"}
                  onChange={(e) =>
                    handleQuestionTypeChange(idx, e.target.value)
                  }
                  style={{ width: 120 }}
                >
                  <option value="text">Text</option>
                  <option value="mcq">MCQ</option>
                </select>
              </div>
              {q.type === "mcq" && (
                <div style={{ marginTop: 8 }}>
                  {[0, 1, 2, 3].map((optIdx) => (
                    <input
                      key={optIdx}
                      type="text"
                      className="form-control"
                      placeholder={`Option ${optIdx + 1}`}
                      value={q.options ? q.options[optIdx] : ""}
                      onChange={(e) =>
                        handleOptionChange(idx, optIdx, e.target.value)
                      }
                      required
                      style={{ marginTop: 4 }}
                    />
                  ))}
                </div>
              )}
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
