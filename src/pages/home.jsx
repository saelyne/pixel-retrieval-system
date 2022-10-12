import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./home.css";
import Header from "../components/header";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";

import { imageInfoCollection, answerInfoCollection } from "../image";

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
        {/* Do not refresh the page while completing the task. */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>To start the task, please enter your <span style={{fontWeight: 800}}>unique Prolific ID.</span></Form.Label>
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
    </>
  );
};

export default Home;
