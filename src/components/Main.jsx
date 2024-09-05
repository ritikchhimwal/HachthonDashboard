import React, { useContext } from "react";
import Header from "./Header";
import "./css/main.css";
import picsart from "../assets/icons/PicsArt_04-14-04.42 1.svg";
import img1 from "../assets/icons/Group 1000002515.svg";
import img2 from "../assets/icons/Group 1000002516.svg";
import img3 from "../assets/icons/Group 1000002518.svg";
import Programs from "./Programs";
import ExploreChallenges from './ExploreChallenges'
import { EventContext } from "../context/EventContext";

const Main = () => {


  const { events } = useContext(EventContext);
  return (
    <>
      <div className="main">
        <Header />
        <div className="maincomp">
          <div className="left">
            <h1>
              Accelerate Innovation <br />
              with Global AI Challenges
            </h1>
            <p>
              AI Challenges at DPhi simulate real-world problems. It is a <br />{" "}
              great place to put your AI/Data Science skills to test on
              <br /> diverse datasets allowing you to foster learning through
              competitions.
            </p>
            <button><a href="https://main--aiplanethachathon.netlify.app/challengeform">Create Challenge</a></button>
          </div>
          <div className="right">
            <img src={picsart} />
          </div>
        </div>
      </div>
      <div className="main-footer">
        <div className="image">
          <img src={img1} />
          <div className="imgcontent">
            <h2>100k+</h2>
            <p>Ai model submissions</p>
          </div><hr/>
        </div>
        <div className="image">
            <img src={img2} />
            <div className="imgcontent">
                <h2>50k+</h2>
                <p>Data Scientist</p>
            </div><hr/>
        </div>
        <div className="image">
            <img src={img3} />
            <div className="imgcontent">
                <h2>100+</h2>
                <p>Ai challenges hosted</p>  
            </div>
        </div>
      </div>
      <Programs/>
      <ExploreChallenges events={events}/>
    </>
  );
};

export default Main;
