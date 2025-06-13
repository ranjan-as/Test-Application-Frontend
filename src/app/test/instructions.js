import React, { useState } from "react";
import "./instructions.css";

export default function TestInstructions({ onAcknowledge }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="nta-instructions-container">
      <h2 className="nta-instructions-title">General Instructions</h2>
      <div style={{ marginBottom: 16 }}>
        <b>Choose Your Default Language</b>
        <div>English</div>
      </div>
      <ol className="nta-instructions-list">
        <li>Please read the instructions carefully</li>
        <li>Total duration of IGNOU - MBA is 180 min.</li>
        <li>
          The clock will be set at the server. The countdown timer in the top
          right corner of screen will display the remaining time available for
          you to complete the examination. When the timer reaches zero, the
          examination will end by itself. You will not be required to end or
          submit your examination.
        </li>
        <li>
          The Questions Palette displayed on the right side of screen will show
          the status of each question using one of the following symbols:
          <ul>
            <li>You have not visited the question yet.</li>
            <li>You have not answered the question.</li>
            <li>You have answered the question.</li>
            <li>
              You have NOT answered the question, but have marked the question
              for review.
            </li>
            <li>
              The question(s) &quot;Answered and Marked for Review&quot; will be
              considered for evaluation.
            </li>
          </ul>
        </li>
        <li>
          You can click on the &quot;&gt;&quot; arrow which appears to the left
          of question palette to collapse the question palette thereby
          maximizing the question window. To view the question palette again,
          you can click on &quot;&lt;&quot; which appears on the right side of
          question window.
        </li>
        <li>
          You can click on your &quot;Profile&quot; image on top right corner of
          your screen to change the language during the exam for entire question
          paper. On clicking of Profile image you will get a drop-down to change
          the question content to the desired language.
        </li>
        <li>
          You can click on to navigate to the bottom and to navigate to top of
          the question area, without scrolling.
        </li>
        <li>
          To answer a question, do the following:
          <ul>
            <li>
              Click on the question number in the Question Palette at the right
              of your screen to go to that numbered question directly. Note that
              using this option does NOT save your answer to the current
              question.
            </li>
            <li>
              Click on Save & Next to save your answer for the current question
              and then go to the next question.
            </li>
            <li>
              Click on Mark for Review & Next to save your answer for the
              current question, mark it for review, and then go to the next
              question.
            </li>
          </ul>
        </li>
        <li>
          Procedure for answering a multiple choice type question:
          <ul>
            <li>
              To select your answer, click on the button of one of the options.
            </li>
            <li>
              To deselect your chosen answer, click on the button of the chosen
              option again or click on the Clear Response button.
            </li>
            <li>
              To change your chosen answer, click on the button of another
              option.
            </li>
            <li>
              To save your answer, you MUST click on the Save & Next button.
            </li>
            <li>
              To mark the question for review, click on the Mark for Review &
              Next button.
            </li>
            <li>
              To change your answer to a question that has already been
              answered, first select that question for answering and then follow
              the procedure for answering that type of question.
            </li>
          </ul>
        </li>
        <li>
          Sections in this question paper are displayed on the top bar of the
          screen. Questions in a section can be viewed by clicking on the
          section name. The section you are currently viewing is highlighted.
        </li>
        <li>
          After clicking the Save & Next button on the last question for a
          section, you will automatically be taken to the first question of the
          next section.
        </li>
        <li>
          You can shuffle between sections and questions anytime during the
          examination as per your convenience only during the time stipulated.
        </li>
        <li>
          Candidate can view the corresponding section summary as part of the
          legend that appears in every section above the question palette.
        </li>
        <li>
          Please note all questions will appear in your default language. This
          language can be changed for a particular question later on.
        </li>
      </ol>
      <div style={{ margin: "16px 0", fontWeight: 500 }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          I have read and understood the instructions. All computer hardware
          allotted to me are in proper working condition. I declare that I am
          not in possession of / not wearing / not carrying any prohibited
          gadget like mobile phone, bluetooth devices etc. /any prohibited
          material with me into the Examination Hall. I agree that in case of
          not adhering to the instructions, I shall be liable to be debarred
          from this Test and/or to disciplinary action, which may include ban
          from future Tests / Examinations.
        </label>
      </div>
      <div className="nta-instructions-actions">
        <button
          className="nta-instructions-btn"
          onClick={onAcknowledge}
          disabled={!checked}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
