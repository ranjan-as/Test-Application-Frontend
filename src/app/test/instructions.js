import React from "react";
import "./instructions.css";

export default function TestInstructions() {
  return (
    <div className="nta-instructions-container">
      <h2 className="nta-instructions-title">General Instructions</h2>
      <ol className="nta-instructions-list">
        <li>Read all the instructions carefully before starting the test.</li>
        <li>Each question will have four options, out of which only one is correct.</li>
        <li>Click on the option you think is correct to select your answer.</li>
        <li>You can navigate between questions using the &quot;Next&quot; and &quot;Previous&quot; buttons.</li>
        <li>To submit your test, click the &quot;Submit Test&quot; button at the end.</li>
        <li>Do not refresh the page or press the back button during the test.</li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>For any technical issues, contact your test administrator.</li>
      </ol>
      <div className="nta-instructions-actions">
        <button className="nta-instructions-btn">I have read and understood the instructions</button>
      </div>
    </div>
  );
}
