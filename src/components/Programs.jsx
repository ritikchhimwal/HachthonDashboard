import React from "react";
import "./css/program.css";
import robot from "../assets/icons/Robot.svg";
import identity from "../assets/icons/IdentificationCard.svg";
import vector from "../assets/icons/Vector.svg";
import notebook from "../assets/icons/carbon_notebook-reference.svg";

const Programs = () => {
  return (
    <div className="program">
      <h1>
        Why Partcipate in <span>AI Challenges ?</span>
      </h1>
      <div className="cards">
        <div className="card1">
          <img src={notebook} />
          <h3>Proove your skill</h3>
          <p>
            Gain substantial experience by solving real-world problems <br/>and pit
            against others to come up with innovative solutions.
          </p>
        </div>
        <div className="card2">
            <img src={vector}/>
            <h3>Learn from community</h3>
            <p>One can look and analyze the solutions submitted by the<br/> other Data Scientists in the community and learn from them.</p>
        </div>
        <div className="card3">
            <img src={robot}/>
            <h3>Challenging yourself</h3>
            <p>There is nothing for you to lose by participating in a<br/> challenge. You can fail safe, learn out of the entire<br/> experience and bounce back harder.</p>
        </div>
        <div className="card4">
            <img src={identity} />
            <h3>Earn recognition</h3>
            <p>You will stand out from the crowd if you do well in AI<br/> challenges, it not only helps you shine in the community but<br/> also earns rewards.</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
