import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./home.css";
import Header from "../components/header";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";

import { imageInfoCollection, answerInfoCollection } from "../image";
import main from "../static/img/main.png"
import selected from "../static/img/selected.png"
import labeled from "../static/img/labeled.png"

const Home = ({ setUserID, setModeID, setGroupImageInfo, setGroupAnswerInfo }) => {
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
      <Header content="Welcome!" />
      <div className="home-window">
        <div className="tutorial-window">
          <div>In this study, you will go through 20 questions that ask you to choose images.</div>
          <div>For each question, there is a <span style={{color:"Purple"}}>Target Image</span> (left), and 20 <span style={{color:"Purple"}}>Candidate Images</span> (right).</div>
          <div>Among Candidate Images, you need to choose 5 images that you think contain the object in the Target Image. </div>
          <img src={main}></img>
          <div>Sometimes, there will be hints that indicate a certain part of the image that MIGHT contain the target image as shown below.</div>
          <div>For this type of questions, you only have to compare the <span style={{color:"Brown"}}>highlighted parts</span>, which can help you complete the task faster. </div>
          <img src={labeled}></img>
          <div className="warning">
            * Do not refresh the page while completing the task. <br />
            * Data we collect: user ID and time taken to complete each question. <br />
            * We collect your ID to verify you on Prolific. The collected IDs will be discarded after the study.
            <div style={{marginTop: "15px", marginBottom:"15px"}}>If you agree with the above terms, please enter your <span style={{fontWeight: 800}}>unique Prolific ID</span> to start the task.</div>
          </div>
        </div>
        <div className="input-window">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>To start the task, please enter your <span style={{fontWeight: 800}}>unique Prolific ID.</span></Form.Label> */}
            <Form.Control placeholder="Enter ID" ref={idRef} />
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
