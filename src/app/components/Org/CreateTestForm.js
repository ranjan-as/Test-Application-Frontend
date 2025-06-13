// Organization Create Test Form Component
import React, { useState, useEffect } from "react";
import "../../css/CreateTestForm.css";

const examOptions = ["JEE Main", "NEET UG", "CUET UG", "NET", "Custom Exam"];
const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "General Knowledge",
  "English",
];
const languageOptions = ["English", "Hindi"];

const CreateTestForm = ({ onSubmit }) => {
  const [isClient, setIsClient] = useState(false);
  const [testName, setTestName] = useState("");
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [questions, setQuestions] = useState([{ text: "" }]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].text = value;
    setQuestions(updated);
  };

  const addQuestion = () => setQuestions([...questions, { text: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: testName,
      exam,
      subject,
      language,
      date,
      time,
      questions,
    });
    setTestName("");
    setExam("");
    setSubject("");
    setLanguage("");
    setDate("");
    setTime("");
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
            <select
              className="form-control"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              required
            >
              <option value="">Select Exam</option>
              {examOptions.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
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
            <select
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select
              className="form-control"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="">Select Language</option>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
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
