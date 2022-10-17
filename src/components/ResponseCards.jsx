import React, { useEffect, useState } from "react";
import "./result.css";


const ResponseCards = ({ data, response, i }) => {
  console.log("ResponseCards",data, response,i);
  const marksObtained = () => {};
  useEffect(() => {
    marksObtained();
  }, []);
  let calls = 0;
  let arr = data.que.split("");
  switch (data.type) {
    case "mcq":
      return (
        <div className="form-div-r">
          <div className="que-r">Question {10 - i}</div>

          <div className="que-r">{data.que}</div>
          <div className="options">
            {data.opt.map((e, i) => {
              let style = {};
              if (response !== undefined) {
                if (response[i] === i && e.ans !== i) {
                  style = {
                    color: "red",
                  };
                }
              }
              if (data.ans === i) {
                style = {
                  color: "green",
                };
              }
              return (
                <label style={style} key={`option${i}-${i}`}>
                  {e}
                </label>
              );
            })}
          </div>
        </div>
      );

    case "mcc":
      return (
        <div className="form-div-r">
          
          <div className="que-r">Question {10 - i}</div>
          <div className="que-r">{data.que}</div>
          <div className="options">
            {data.opt.map((e, i) => {
              let style = {};
              console.log("FINAL",response)
              if (response !== undefined) {
                if (response[i] === true && e.ans[i] === false) {
                  style = {
                    color: "red",
                  };
                }
              }
              if (data.ans[i] === true) {
                style = {
                  color: "green",
                };
              }
              return (
                <label style={style} key={`option${i}-${i}`}>
                  {e}this
                </label>
              );
            })}
          </div>
        </div>
      );
    case "fill":
      return (
        <div className="form-div-r">
          <div className="que-r">Question {10 - i}</div>
          <div className="que-r">
            {arr.map((e, i) => {
              if (e !== "_") {
                return <span>{e}</span> ;
              } else {
                return <span style={{color:"green"}}>{data.ans[calls++]}</span>;
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
