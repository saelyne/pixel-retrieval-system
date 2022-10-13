import React, { useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import End from "./pages/end";
import { imageInfoCollection, answerInfoCollection } from "./image";

const App = () => {
  const MAX_SELECTED_COUNT = 3;
  const NUM_IMAGES = 12;
  const NUM_QUESTIONS = 20;

  const [userID, setUserID] = useState("");
  const [questionID, setQuestionID] = useState(0);
  const [groupImageInfo, setGroupImageInfo] = useState(
    imageInfoCollection["abtw"]
  );
  const [groupAnswerInfo, setGroupAnswerInfo] = useState(
    answerInfoCollection["abtw"]
  );
  const [imageInfo, setImageInfo] = useState();
  const [answerInfo, setAnswerInfo] = useState();
  const [modeID, setModeID] = useState("abtw");

  useEffect(() => {
    setImageInfo(groupImageInfo[questionID]);
    setAnswerInfo(groupAnswerInfo[questionID]);
  }, [questionID, groupImageInfo, groupAnswerInfo]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            exact
            path="/:id"
            element={
              <Home
                setUserID={setUserID}
                setModeID={setModeID}
                setGroupImageInfo={setGroupImageInfo}
                setGroupAnswerInfo={setGroupAnswerInfo}
                MAX_SELECTED_COUNT={MAX_SELECTED_COUNT}
                NUM_IMAGES={NUM_IMAGES}
                NUM_QUESTIONS={NUM_QUESTIONS}
              />
            }
          />
          <Route
            exact
            path="/quiz"
            element={
              <Quiz
                userID={userID}
                questionID={questionID}
                setQuestionID={setQuestionID}
                imageInfo={imageInfo}
                answerInfo={answerInfo}
                modeID={modeID}
                MAX_SELECTED_COUNT={MAX_SELECTED_COUNT}
                NUM_IMAGES={NUM_IMAGES}
                NUM_QUESTIONS={NUM_QUESTIONS}
              />
            }
          />
          <Route exact path="/end" element={<End modeID={modeID} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
