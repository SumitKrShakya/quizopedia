import React, { useEffect, useState } from "react";
import "./result.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
// import ResponseCards from "./ResponseCards";

const ResultCard = ({ data, answersMarked }) => {
  console.log("ResultCard",data, answersMarked)
  const [marks, setMarks] = useState(0);

  // console.log(
  //   data.map((e) => e.ans),
  //   "answers",
  //   answersMarked
  // );

  useEffect(() => {
    console.log("here")
    let tempMarks = 0;
    const marksObtained = () => {
      console.log(data)
      data.map((e, i, arr) => {
        console.log("data.map",e,i)
        switch (e.type) {
          case "mcq":
            if (answersMarked[i] === undefined) break;
            if (e.ans == answersMarked[i]) tempMarks++;
            break;
          case "mcc":
            console.log(answersMarked[i]);
            if (answersMarked[i] === undefined) {break;}
            if (e.ans.join() == answersMarked[i].join()) tempMarks++;
            break;
          case "fill":
            if (answersMarked[i] === undefined) {break;}
            console.log(answersMarked[i]);
            if (e.ans.join() == answersMarked[i].join()) tempMarks++;
            break;

          default:
            break;
        }
      });
    };
    marksObtained();

    console.log("tempMarks",tempMarks);
    setMarks(tempMarks);
  }, [answersMarked]);

  return (
    <div className="main">
      <div className="result-box">
        <div className="score">{marks}/10</div>
        <div className="result">
          <Parallax id="parallex-id" pages={10} style={{ top: "0", left: "0" }}>
            {
            // data.map((e, i) => {
            //   <ParallaxLayer
            //     speed={0}
            //     offset={i}
            //     style={{
            //       display: "flex",
            //       justifyContent: "center",
            //       alignItems: "center",
            //     }}
            //   >
            //     {/* <ResponseCards data={e} response={answersMarked}/> */}
            //   </ParallaxLayer>;
            // })
            }
            <ParallaxLayer
              speed={0}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "royalblue",
                border: "10px solid white",
                boxSizing: "border-box",
                padding: "100px",
              }}
            >
              <h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </ParallaxLayer>
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
