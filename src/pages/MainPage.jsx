import React, { useState } from "react";
import Card from "../components/Card";
import data from "../data";
import styled from "styled-components";
import BG from "../images/bg.jpg";
import Next from "../images/next.svg";
import Prev from "../images/prev.svg";
import Profile from "../images/profile.png";
import { useSprings, animated, useSpring, config } from "react-spring";
import "../components/card.css";

data.reverse();

const colors = [
  "#EEEEEE",
  "#1BADFF",
  "#FF2828",
  "#FF1B7B",
  "#1BFFC8",
  "#72FF1B",
  "#D119FF",
  "#1EC9FF",
  "#FF6868",
  "#D07D00",
];
colors.sort(() => (Math.random() > 0.5 ? 1 : -1));

// console.log(data);

const MainPage = () => {
  const [test, setTest] = useState(false);
  const [currQue, setCurrQue] = useState(0);
  const [answer, setAnswer] = useState(Array(10).fill(undefined));
  console.log(answer);
  const dataSpring = colors.map((e, i) => {
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
    // console.log(currQue,i,"angle",angle,data[i].que)

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
        backgroundColor: `${e}`,
        transform: `rotate(${angle}deg) translate(${temp}px)`,
      },
      delay: i * 100,
    };
  });

  // const nextSpring = useSpring({
  //   from: {
  //     y: "150px",
  //   },
  //   to: {
  //     y: "0vh",
  //   },
  //   config: { mass: 10, tention:10 },
  // });

  const mainSpring = useSpring({
    from:{
      transform:`rotateX(90deg)`,
      transformOrigin:"50% 100%"
    },
    to:{
      transform:`rotateX(0deg)`,
      transformOrigin:"50% 100%"
    },
    config:{mass:10}
  })

  // console.log("spring",dataSpring.map((e)=>e.to.transformOrigin))
  const spring = useSprings(
    dataSpring.length,
    dataSpring.map(({ id, ...config }) => {
      // console.log(config);
      return config;
    })
  );
  const onClickNext = () => {
    setCurrQue(currQue + 1);
  };
  const onClickPrev = () => {
    setCurrQue(currQue - 1);
  };

  const answerHandler = (i, ans) => {
    let temp = answer;
    temp[i] = ans;
    setAnswer(temp);
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
          // console.log("card-" + index, "cards-" + index);
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
      <animated.div style={mainSpring} className="bottom">
        <div
          onClick={() => {
            onClickPrev();
          }}
          className="left"
        >
          <img src={Prev} alt="" />
        </div>
        <div className="center">{currQue + 1}/10</div>
        <div
          // style={{ ...nextSpring }}
          onClick={() => {
            onClickNext();
          }}
          className="right"
        >
          <img src={Next} alt="" />
        </div>
      </animated.div>

      <img className="profile" src={Profile} alt="" />
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
    // background-color:rgba(255,255,255,0.7);
    // backdrop-filter: blur(10px);
    // box-shadow:0px 0px 10px white;
    width: 100vw;
    height: 15vh;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    .left {
      // padding:0px 20px;
      flex: 1;
      // background-color:red;
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
      font-family: 'Varela Round', sans-serif;

    }
    .right {
      // padding:0px 20px;
      flex: 1;
      // background-color:red;
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
`;

export default MainPage;
