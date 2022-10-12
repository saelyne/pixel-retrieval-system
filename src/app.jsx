import React, { useState, useEffect } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import End from "./pages/end";
import { imageInfoCollection, answerInfoCollection } from "./image";

const App = () => {
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
                setGroupImageInfo={setGroupImageInfo}
                setGroupAnswerInfo={setGroupAnswerInfo}
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
              />
            }
          />
          <Route exact path="/end" element={<End userID={userID} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
