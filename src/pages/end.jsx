import React, { useState, useEffect } from "react";

import db from "../service/firebase";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

import "./home.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import labeledImage from "../static/data/db/o40/TP_labled/462_oxford_001710.jpg";
import unlabeledImage from "../static/data/db/o40/TP/462_oxford_001710.jpg";

const End = ({ modeID, userID }) => {
  const [score, setScore] = useState(7);
  const navigate = useNavigate();

  const logData = () => {
    if (userID === "") return;
    const save_path = "/Log/" + modeID + "/" + userID;
    const updates = {};
    updates[save_path + "/score"] = {
      score,
    };
    navigate("/powjdo");
    console.log("hello");
    return update(ref(db), updates);
  };

  return (
    <>
      <div className="end-window">
        <div>
          Q. How helpful was it to see{" "}
          <span style={{ color: "Brown" }}>
            {" "}
            hints (red line indicating an object){" "}
          </span>{" "}
          in completing the task compared to those without hints?
          <div className="end-image-box">
            <div className="end-image">
              <div>Image without hints</div>
              <img src={unlabeledImage} />
            </div>
            <div className="end-image">
              <div>Image with hints</div>
              <img src={labeledImage} />
            </div>
          </div>
        </div>
        <div className="slider">
          <div>Not Helpful</div>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Score"
              defaultValue={7}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={7}
              onChange={(e, val) => setScore(val)}
            />
          </Box>
          <div>Very Helpful</div>
        </div>
        <Button variant="contained" onClick={() => logData()}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default End;
