import React from "react";
import styled from "styled-components";
import "./card.css";
import Mcq from "./Mcq";

const Card = ({ data, index }) => {
  // console.log("data", data.type, data.que, data.opt);
  switch (data.type) {
    case "mcq":
      return (
        <div className="form-div">
          <div className="que">{data.que}</div>
          <div className="options">
            {
              data.opt.map((e,i)=>{
                return <label style={{cursor: "pointer"}} for={`option${index}-${i}`}>
                <input className="mcq-option" type='radio' name='option' value='1/6' id={`option${index}-${i}`} />
                {e}</label>
              })
            }
          </div>
        </div>
      )

    case 'mcc':
      return (
        <div className="form-div">
          <div className="que">{data.que}</div>
          <div className="options">
            {
              data.opt.map((e,i)=>{
                return <label style={{cursor: "pointer"}} for={`option${index}-${i}`}>
                <input className="mcq-option" type='checkbox' name='option' value='1/6' id={`option${index}-${i}`} />
                {e}</label>
              })
            }
          </div>
        </div>
      )
    case 'mcq':
      return (<div className="form-div">{

      }</div>)
      case 'mcq':
      return (<div className="form-div">{

      }</div>)

    default:
      break;
  }
  return <div className="form-div"></div>;
};

export default Card;
