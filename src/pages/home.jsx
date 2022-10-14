import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./home.css";
import Header from "../components/header";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";

import { imageInfoCollection, answerInfoCollection } from "../image";
import main from "../static/img/main.png";
import selected from "../static/img/selected.png";
import labeled from "../static/img/labeled.png";
import Alert from "react-bootstrap/Alert";

const Home = ({
  setUserID,
  setModeID,
  setGroupImageInfo,
  setGroupAnswerInfo,
  MAX_SELECTED_COUNT,
  NUM_IMAGES,
  NUM_QUESTIONS,
}) => {
  const idRef = React.createRef();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setGroupImageInfo(imageInfoCollection[id]);
    setGroupAnswerInfo(answerInfoCollection[id]);
    setModeID(id);
  });

  const onClickSubmit = () => {
    setUserID(idRef.current.value);
    navigate("/quiz");
  };

  return (
    <>
      <Header questionID={-1} NUM_QUESTIONS={NUM_QUESTIONS} />
      <div className="home-window">
        <div className="tutorial-window">
          <div>
            In this study, you will go through {NUM_QUESTIONS - 2} questions
            that ask you to choose images.
          </div>
          <div>
            For each question, there is a{" "}
            <span style={{ color: "Purple" }}>Target Image</span> (left), and{" "}
            {NUM_IMAGES}{" "}
            <span style={{ color: "Purple" }}>Candidate Images</span> (right).
          </div>
          <div>
            Among Candidate Images, you need to{" "}
            <span style={{ color: "Brown" }}>
              choose {MAX_SELECTED_COUNT} images that you think contain the
              object in the Target Image
            </span>
            .{" "}
          </div>
          <img src={main}></img>
          <div>
            Sometimes, there will be hints that indicate a certain part of the
            image that MIGHT contain the Target Image as shown below.
          </div>
          <div>
            For this type of questions,{" "}
            <span style={{ color: "Brown" }}>
              {" "}
              you only have to compare the highlighted parts
            </span>
            , which can help you complete the task faster.{" "}
          </div>
          <img src={labeled}></img>
          <div className="warning">
            <div className="intro-warning">
              <Alert variant="danger">
                <ul>
                  <li>
                    {" "}
                    Since we measure the time taken, please do not take a rest
                    in middle of each question as much as possible. The task
                    will take ~15 min on average.
                  </li>
                  <li>
                    Do not refresh the page or go back to a previous page while
                    completing the task.
                  </li>
                </ul>
              </Alert>
            </div>
            * Data we collect: user ID and time taken to complete each question.{" "}
            <br />* We collect your ID to verify you on Prolific. The collected
            IDs will be discarded after the study.
            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
              If you agree with the above terms, please enter your{" "}
              <span style={{ fontWeight: 800 }}>unique Prolific ID</span> to
              start the task.
            </div>
          </div>
        </div>
        <div className="input-window">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>To start the task, please enter your <span style={{fontWeight: 800}}>unique Prolific ID.</span></Form.Label> */}
              <Form.Control
                placeholder="Enter your unique Prolific ID"
                ref={idRef}
              />
              <Form.Text className="text-muted">
                {/* We'll never share your email with anyone else. */}
              </Form.Text>
            </Form.Group>
            <Button variant="contained" onClick={() => onClickSubmit()}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
