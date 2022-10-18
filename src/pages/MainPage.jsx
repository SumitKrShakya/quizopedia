import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import data from "../data";
import styled from "styled-components";
import Next from "../images/next.svg";
import Prev from "../images/prev.svg";
import Profile from "../images/profile.jpg";
import { useSprings, animated, useSpring } from "react-spring";
import "../components/card.css";
import ResultCard from "../components/ResultCard";


data.reverse();

const colors = [
  ["#EEEEEE", "#168bcc"],
  ["#1BADFF", "#ca00a2"],
  ["#FF2828", "#ffce00"],
  ["#FF1B7B", "#ffffff"],
  ["#1BFFC8", "#094678"],
  ["#72FF1B", "#006430"],
  ["#D119FF", "#f9ff8f"],
  ["#1EC9FF", "#f9ff88"],
  ["#FF6868", "#ffa0a0"],
  ["#D07D00", "#ffffff"],
];
colors.sort(() => (Math.random() > 0.5 ? 1 : -1));

const MainPage = () => {
  const [currQue, setCurrQue] = useState(0);
  const [answer, setAnswer] = useState(Array(10).fill(undefined));
  const [start, setStart] = useState(false);
  const [submitfooter, setSubmitfooter] = useState(false);
  const [name, setName] = useState(undefined)

  const setNameHandler = (e) => {
    setName(e.target.value);
  }

  useEffect(() => {
    if (start === true) {
      for (let i = 0; i < 10000; i++) {
        clearInterval(i);
      }
      setCurrQue(0);
    }
  }, [start]);

  useEffect(() => {
    let intervalID = setInterval(() => {
      setCurrQue(-1 * Math.random() * 1000);
    }, 1000);
  }, []);

  const startHandler = () => {
    setCurrQue(currQue - currQue + 1);
    setStart(true);
  };

  let dataSpring = colors.map((e, i) => {
    let temp = `${Math.round(Math.random() * 40 - 20)}px,${Math.round(
      Math.random() * 40 - 20
    )}`;

    if (currQue > 9 - i) {
      temp = `${i % 2 ? "1000" : "-1000"}px,${0}px`;
    }

    let angle = `${Math.round(Math.random() * 20 - 10)}`;
    if (currQue === 9 - i) {
      angle = `0`;
    }
    let delay = i * 100;
    if (currQue === 0) {
      delay += 1000;
    }

    return {
      id: `colors${i}`,
      from: {
        y: -1000,
        transform: `rotate(0deg) translate(${Math.round(
          Math.random() * 1000 - 500
        )}px,0px)`,
        backgroundColor: "white",
      },
      to: {
        y: 0,
        x: 0,
        transformOrigin: `${Math.round(Math.random() * 100)}% ${Math.round(
          Math.random() * 100
        )}%`,
        backgroundImage: `linear-gradient(to bottom right, ${e[0]}, ${e[1]})`,
        transform: `rotate(${angle}deg) translate(${temp}px)`,
      },
      delay: delay,
    };
  });

  const startGameSpring = colors.map((e, i) => {
    let temp = `${Math.round(Math.random() * 40 - 20)}px,${Math.round(
      Math.random() * 40 - 20
    )}`;

    if (currQue > 9 - i) {
      temp = `${i % 2 ? "1000" : "-1000"}px,${0}px`;
    }

    let angle = `${Math.round(Math.random() * 20 - 10)}`;
    if (currQue === 9 - i) {
      angle = `0`;
    }
    return {
      id: `colors${i}`,
      to: {
        y: 0,
        x: 0,
        transformOrigin: `${Math.round(Math.random() * 100)}% ${Math.round(
          Math.random() * 100
        )}%`,
        backgroundImage: `linear-gradient(to bottom right, ${e[0]}, ${e[1]})`,
        transform: `rotate(${angle}deg) translate(${temp}px)`,
      },
      delay: i * 100,
    };
  });

  if (start === false) {
    dataSpring = startGameSpring;
  }

  const spring = useSprings(
    dataSpring.length,
    dataSpring.map(({ id, ...config }) => {
      return config;
    })
  );


  let mainSpringDelay = submitfooter ? 0 : 3000;
  const mainSpring = useSpring({
    from: {
      transform: `rotateX(90deg)`,
      transformOrigin: "50% 100%",
    },
    to: {
      transform: `rotateX(0deg)`,
      transformOrigin: "50% 100%",
    },
    reverse: submitfooter,
    reset: submitfooter,
    delay: mainSpringDelay,
    config: { mass: 10 },
  });

  const onClickNext = () => {
    setCurrQue(currQue + 1);
  };
  const onClickPrev = () => {
    setCurrQue(currQue - 1 === -1 ? currQue : currQue - 1);
  };

  const answerHandler = (i, ans) => {
    let temp = answer;
    temp[i] = ans;
    setAnswer(temp);
  };

  const submitHandler = () => {
    setCurrQue(10);
    setSubmitfooter(true);
  };

  return (
    <FormContainer>
      <div className="background">
        {[...Array(1000)].map((e, i) => (
          <div key={i} className="bg-box"></div>
        ))}
      </div>
      <div className="cards-container">
        {spring.map((spring, index) => {
          return (
            <animated.div
              style={{ ...spring }}
              className="form-border"
              key={"card-" + index}
            >
              <Card
                key={"cards-" + index}
                answerHandler={answerHandler}
                currQue={currQue}
                index={index}
                data={data[index]}
              />
            </animated.div>
          );
        })}
      </div>
      {start ? (
        <animated.div style={mainSpring} className="bottom">
          {currQue > 0 ? (
            <div
              onClick={() => {
                onClickPrev();
              }}
              className="left"
            >
              <img src={Prev} alt="" />
            </div>
          ) : (
            <div className="left"></div>
          )}
          <div className="center">
            {currQue + 1 === 11 ? 10 : currQue + 1}/10
          </div>
          {currQue !== 9 ? (
            <div
              onClick={() => {
                onClickNext();
              }}
              className="right"
            >
              <img src={Next} alt="" />
            </div>
          ) : (
            <div
              onClick={() => {
                submitHandler();
              }}
              className="submit"
            >
              submit
            </div>
          )}
        </animated.div>
      ) : (
        ""
      )}
      <img
        className={`${start === false ? "center-profile" : ""} profile `}
        src={Profile}
        alt=""
      />
      {start === false ? (
        <div
          onClick={() => {
            onClickPrev();
          }}
          className="test"
        >
          <div className="title">
            <div className="head">Quizopedia</div>
            <div className="start-button">
              Welcome
              <input
                type="text"
                className="input-option"
                placeholder="Enter Username"
                onChange={setNameHandler}
              />
              <br />
              <br />
              <span
                className="start-button-span"
                onClick={() => startHandler()}
              >
                {" "}
                Start{" "}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {currQue >= 10 ? <ResultCard name={name} data={data} answersMarked={answer} /> : null}
      {start?(
       <div className="status">
        <div style={{width:`${(currQue+1)*10}%`,backgroundColor:`rgba(0,128,0,${(currQue+1)*0.1})`}} className="bar">
          
        </div>
       </div> 
      ):null}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/assets/bg.jpg);
  position: relative;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    transform: scale(1.1);
    .bg-box {
      height: 2.8rem;
      width: 2.8rem;
      display: inline-block;
      margin: -0.12rem 0rem;
      border: 1px solid blue;
    }
  }
  .cards-container {
    height: 70vh;
    width: 50vw;
    position: relative;
  }
  .bottom {
    width: 100vw;
    height: 15vh;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    .left {
      flex: 1;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(0.9);
      }
    }
    .center {
      flex: 5;
      text-align: center;
      padding-top: 6vh;
      font-weight: bolder;
      font-size: 1.3rem;
      font-family: "Varela Round", sans-serif;
    }
    .submit {
      padding-top: 4vh;
      font-weight: bolder;
      font-size: 2.5rem;
      font-family: "Varela Round", sans-serif;
      flex: 1;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(0.9);
      }
    }
    .right {
      flex: 1;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(0.9);
      }
    }
  }
  .profile {
    height: 12vh;
    width: 12vh;
    position: absolute;
    top: 5vh;
    right: 5vh;
    z-index: 20;
    border-radius: 100%;
  }
  .center-profile {
    top: 10vh;
    right: 46vw;
  }
  .test {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      border-radius: 11% 89% 16% 84% / 86% 12% 88% 14%;
      font-family: "Varela Round", sans-serif;
      width: 400px;
      height: 500px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      display: flex;
      justify-content: center;
      gap: 15%;
      align-items: center;
      flex-direction: column;
      .head {
        font-size: 3rem;
        text-transform: uppercase;
        background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 900;
      }
      .start-button {
        text-align: center;
        padding: 2rem 3rem;
        font-size: 2rem;
        color: grey;
        .start-button-span {
          border: 4px solid white;
          background-image: linear-gradient(to right, #30cfd0 0%, #330867 100%);
          border-radius: 10px;
          padding: 10px 20px;
          margin-top: 1000px;
          color: white;
          &:hover {
            background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            cursor: pointer;
          }
        }
        input {
          text-align: center;
          border: 2px solid black;
          border-width: 0px 0px 2px 0px;
          font-family: "Varela Round", sans-serif;
          width: 10rem;
          color: rgb(74, 74, 74);
          font-size: 1.2rem;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
  .status{
    position:absolute;
    left:20vw;
    bottom:10px;
    width:60vw;
    height:20px;
    background-color:white;
    border-radius:20px;
    box-shadow:0px 0px 10px rgba(0,0,0,0.5);
    .bar{
      transition:all 0.5s ease-in-out;
      border-radius:20px;
      height:100%;
    }
  }
`;

export default MainPage;
