import React, { useEffect, useState } from "react";
import "./result.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import ResponseCards from "./ResponseCards";
import Trophy from "../images/trophy.png";

const ResultCard = ({ data, answersMarked, name }) => {
  console.log("ResultCard", data, "answersMarked", answersMarked);
  const [marks, setMarks] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let tempMarks = 0;
    const marksObtained = () => {
      data.map((e, i, arr) => {
        console.log(e.ans, answersMarked[i]);
        switch (e.type) {
          case "mcq":
            if (answersMarked[i] === undefined) break;
            if (e.ans === answersMarked[i]) tempMarks++;
            break;
          case "mcc":
            if (answersMarked[i] === undefined) {
              break;
            }
            if (e.ans.join() === answersMarked[i].join()) tempMarks++;
            break;
          case "fill":
            console.log("this is where i find ans", e.ans, answersMarked[i], i);

            if (answersMarked[i] === undefined) {
              break;
            }
            if (e.ans.join() === answersMarked[i].join()) tempMarks++;
            break;

          default:
            break;
        }
      });
    };
    marksObtained();

    setMarks(tempMarks);
  }, [answersMarked]);

  const design = () => {
    let t = Math.round(Math.random() * 50 + 10);
    let temp = {
      position: "absolute",
      height: `${t}px`,
      width: `${t}px`,
      borderRadius: `50px`,
      backgroundColor: "red",
      top: `${Math.round(Math.random() * 400)}px`,
      left: `${Math.round(Math.random() * 400)}px`,
      transition: `all 3s ease`,
    };
    return temp;
  };
  useEffect(() => {
    setInterval(() => {
      setRefresh(!refresh);
    }, 3000);
  }, []);

  console.log("last", data);

  return (
    <div className="main">
      <div className="result-box">
        <div className="score">
          {/* <div
            style={{ transform: `rotate(10deg)` }}
            className="triangle-down"
          ></div> */}
          {[...Array(20)].map((e, i) => {
            return (
              <div
                style={{ transform: `rotate(${i * 20}deg) translateX(20%)` }}
                className="triangle-down"
              ></div>
            );
          })}
          <div className="congo">Congratulations {name}</div>
          <div className="duv">
            <img src={Trophy} alt="" />
          </div>
          <div className="score-res">{marks}/10</div>
        </div>
        <div className="result">
          <Parallax id="parallex-id" pages={10} style={{ top: "0", left: "0" }}>
            {[...Array(20)].map((e, i) => {
              return (
                <ParallaxLayer
                  speed={Math.random() * 2}
                  offset={Math.random() * 0.1}
                  style={{
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <div
                    style={
                      refresh ? design(Math.random()) : design(Math.random())
                    }
                  ></div>
                </ParallaxLayer>
              );
            })}
            {data.map((e, i) => {
              return (
                <ParallaxLayer
                  speed={1}
                  offset={i * 1.01}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ResponseCards
                    i={9 - i}
                    data={data[9 - i]}
                    response={answersMarked[9 - i]}
                  />
                </ParallaxLayer>
              );
            })}
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
