import React, { useState } from "react";
import "./card.css";

const Card = ({ data, index, currQue, answerHandler }) => {
  const [ansArr, setAnsArr] = useState(Array(data.ans.length).fill(false));
  const handleMcqChange = (e) => {
    answerHandler(index, e);
  };
  const handleMccChange = (e) => {
    let temp = ansArr;
    temp[e.target.value] = e.target.checked;
    answerHandler(index, temp);
    setAnsArr(temp);
  };

  let arr = data.que.split("");

  const handleFillChange = (e)=>{
    let temp = ansArr;
    temp[e.target.name] = e.target.value;
    answerHandler(index, temp);
    setAnsArr(temp);
  }

  let keyOfFill = 0;

  switch (data.type) {
    case "mcq":
      return (
        <div className="form-div">
          <div className="que">Question {10-(index)}</div>
          <div className="que">{data.que}</div>
          <div className="options">
            {data.opt.map((e, i) => {
              return (
                <label
                  style={{ cursor: "pointer" }}
                  key={`option${index}-${i}`}
                >
                  <input
                  key={`option${index}-${i}input`}
                    onChange={() => handleMcqChange(i)}
                    className="mcq-option"
                    type="radio"
                    name="option"
                    id={`option${index}-${i}`}
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
          <div className="que">Question {10-(index)}</div>
          <div className="que">{data.que}</div>
          <div className="options">
            {data.opt.map((e, i) => {
              return (
                <label
                  style={{ cursor: "pointer" }}
                  key={`option${index}-${i}`}
                >
                  <input
                    className="mcq-option"
                    type="checkbox"
                    name="option"
                    value={`${i}`}
                    key={`option${index}-${i}input`}
                    onChange={handleMccChange}
                    id={`option${index}-${i}`}
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
          <div className="que">Question {10-(index)}</div>
          <div className="que">
            {
            arr.map((e, i) => {
              if (e !== "_") {
                return e;
              } else {
                return <input key={`${keyOfFill}inputKey`} name={keyOfFill++} onChange={handleFillChange} type={data.inputType} className="input-option" />;
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

export default Card;
