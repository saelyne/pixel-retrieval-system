import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

import db from "../service/firebase";
import { ref, update } from "firebase/database";

import "./home.css";
import Button from "@mui/material/Button";

const Quiz = ({ userID, questionID, setQuestionID, imageInfo, answerInfo }) => {
  const MAX_SELECTED_COUNT = 5;
  const NUM_IMAGES = 20;
  const NUM_QUESTIONS = 20;
  const enumerate = Array.from(Array(NUM_IMAGES).keys());
  const navigate = useNavigate();

  const [selectedCount, setSelectedCount] = useState(0);
  const [candidateAnswers, setCandidateAnswers] = useState([]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [logIndex, setLogIndex] = useState(0);
  const [correct, setCorrect] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (userID == ""){
  //     alert ("Go back to the main page and enter your user ID.");
  //   }
  // })

  useEffect(() => {
    if (submitted){
      
    logData();

      if (correct.length === MAX_SELECTED_COUNT) {
        setRunning(false);
        if (questionID === NUM_QUESTIONS - 1) {
          alert("Great job! You've done all the tasks.");
          navigate("/end");
        } else {
          alert("Great job! Moving on to the next question.");
          setQuestionID(questionID + 1);
        }
      } else {
        for (let index of correct) {
          document.getElementById(index.toString()).classList.add("correct");
        }
        alert(
          `You got ${correct.length} right. Find ${
            MAX_SELECTED_COUNT - correct.length
          } more!`
        );
      }
    }
  }, [correct]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setSelectedCount(0);
    setCandidateAnswers([]);
    setTime(0);
    setRunning(true);
    setLogIndex(0);
    setCorrect([]);
    setSubmitted(false);
    const image_divs =
      document.getElementsByClassName("candidate-images")[0].children;
    if (image_divs) {
      for (let i = 0; i < image_divs.length; i++) {
        let img = image_divs[i];
        if (img.classList.contains("correct")) {
          img.classList.remove("correct");
        }
        if (img.classList.contains("selected")) {
          img.classList.remove("selected");
        }
      }
    }
  }, [questionID]);

  // database
  const logData = () => {
    if (userID === "") return;
    const save_path = "/Log/" + userID;
    const updates = {};
    updates[save_path + "/" + questionID + "/" + logIndex] = {
      numCorrect: correct.length,
      time,
    };
    setLogIndex(logIndex + 1);
    return update(ref(db), updates);
  };

  const onClickImage = (target) => {
    if (target.classList.contains("correct")) {
      return;
    }
    if (target.classList.contains("selected")) {
      setSelectedCount(selectedCount - 1);
      const candidates = candidateAnswers.filter(
        (answer) => answer !== parseInt(target.id)
      );
      setCandidateAnswers(candidates);
    } else {
      if (selectedCount === MAX_SELECTED_COUNT) {
        alert(
          `You've already selected ${MAX_SELECTED_COUNT} images. Please unselect one or click the Submit button.`
        );
        return;
      } else {
        const candidates = [...candidateAnswers];
        candidates.push(parseInt(target.id));
        setCandidateAnswers(candidates);
        setSelectedCount(selectedCount + 1);
      }
    }
    target.classList.toggle("selected");
  };

  const onClickGrade = () => {
    const correctList = answerInfo.filter((value) =>
      candidateAnswers.includes(value)
    );
    setCorrect(correctList);
    setSubmitted(true);
  };

  return (
    <>
      <Header content={`Question ${questionID + 1} / ${NUM_QUESTIONS}`} />
      <div className="quiz-window">
        <div className="query">
          <h4>Target Image</h4>
          <img src={imageInfo['query']} alt="" />
          <div className="query-description">
            <h4 style={{ marginTop: "15px", marginBottom: "15px" }}>
              <span>{("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
            </h4>
            <h5 style={{ marginTop: "15px", marginBottom: "15px" }}>
              Selected: {selectedCount} / {MAX_SELECTED_COUNT}
            </h5>
            <Button
              variant="contained"
              color="success"
              size="medium"
              disabled={selectedCount === MAX_SELECTED_COUNT ? false : true}
              onClick={() => onClickGrade()}
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="candidate">
          <h4>
            Candidate Images (scroll ↓) - Choose {MAX_SELECTED_COUNT} images
            that contain the Target Image.
          </h4>
          <div className="candidate-images">
            {enumerate.map((item, ind) => (
              <img
                src={imageInfo[ind]}
                key={ind}
                id={ind}
                alt=""
                onClick={(e) => onClickImage(e.target)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
