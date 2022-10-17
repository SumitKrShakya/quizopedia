import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./card.css";
import Mcq from "./Mcq";

const ResponseCards = ({ data, response }) => {
  console.log("ResponseCards",data, response);
  const marksObtained = () => {};
  useEffect(() => {
    marksObtained();
  }, []);
  

  let arr = data.que.split("");
  let keyOfFill = 0;
  console.log("here->",data.type)
  switch (data.type) {
    case "mcq":
      return (
        <div className="form-div">
          <div className="que">{data.que}</div>
          <div className="options">
            {data.opt.map((e, i) => {
              return (
                <label style={{ cursor: "pointer" }} key={`option${i}-${i}`}>
                  <input
                    key={`option${i}-${i}input`}
                    className="mcq-option"
                    type="radio"
                    name="option"
                    id={`option${i}-${i}`}
                  />
                  {e}
                </label>
              );
            })}
          </div>
        </div>
      );

    case "mcc":
      return (
        <div className="form-div">
          <div className="que">{data.que}</div>
          <div className="options">
            {data.opt.map((e, i) => {
              return (
                <label style={{ cursor: "pointer" }} key={`option${i}-${i}`}>
                  <input
                    className="mcq-option"
                    type="checkbox"
                    name="option"
                    value={`${i}`}
                    key={`option${i}-${i}input`}
                    id={`option${i}-${i}`}
                  />
                  {e}
                </label>
              );
            })}
          </div>
        </div>
      );
    case "fill":
      return (
        <div className="form-div">
          <div className="que">
            {arr.map((e, i) => {
              if (e !== "_") {
                return e;
              } else {
                return (
                  <input
                    key={`${keyOfFill}inputKey`}
                    name={keyOfFill++}
                    type={data.inputType}
                    className="input-option"
                  />
                );
              }
            })}
          </div>
        </div>
      );
    case "mcq":
      return <div className="form-div">{}</div>;
  }
  return <div className="form-div"></div>;
};

export default ResponseCards;
