import React, { useState } from "react";
import Card from "../components/Card";
import data from "../data";
import styled from "styled-components";
import BG from "../images/bg.jpg";
import Next from "../images/next.svg";
import Prev from "../images/prev.svg";
import Profile from "../images/profile.png";
import { useSprings, animated } from "react-spring";
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

const dataSpring = colors.map((e, i) => {
  return {
    id: `colors${i}`,
    from: {
      y: -1000,
      transform: `rotate(0deg) translate(${Math.round((Math.random()*1000)-500)}px,0px)`,
      backgroundColor: "white",
    },
    to: {
      y: 0,
      x:0,
      backgroundColor: `${e}`,
      transform: `rotate(${Math.round(
        Math.random() * 30 - 15
      )}deg) translate(${Math.round(Math.random() * 40 - 20)}px,${Math.round(
        Math.random() * 40 - 20
      )}px)`,
    },
    delay: i * 100,
  };
});

// console.log(data);

const MainPage = () => {
  const [test, setTest] = useState(false)
  const [currQue, setCurrQue] = useState(1);
  console.log(currQue)
  const spring = useSprings(
    dataSpring.length,
    dataSpring.map(({ id, ...config }) => {
      // console.log(config);
      return config;
    })
  )
  const onClickNext = ()=>{
    setCurrQue(2);
    
    // colors.sort(() => (Math.random() > 0.5 ? 1 : -1));
  } 

  return (
    <FormContainer>
      <div className="background">
        {[...Array(1000)].map((e, i) => (
          <div key={i} className="bg-box"></div>
        ))}
      </div>
      <div className="cards-container">
        {spring.map((spring, index) => (
          <animated.div
            style={{ ...spring }}
            className="form-border"
            key={"card" + index}
          >
            <Card index={index} data={data[index]} />
          </animated.div>
        ))}
      </div>
      <div className="bottom">
        <div onClick={()=>{onClickNext()}} className="left">
          <img src={Prev} alt="" />
        </div>
        <div className="center">
        {currQue}/10
        </div>
        <div onClick={()=>{setTest(!test)}} className="right">
          <img src={Next} alt="" />
        </div>
      </div>

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
      padding-top:6vh;
      font-weight: bolder;
      font-size:1.3rem;
      font-family: 'Comfortaa', cursive;
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
