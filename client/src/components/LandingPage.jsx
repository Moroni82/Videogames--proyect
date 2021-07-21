import React from "react";
import LandingSlider from "./Slider/LandingSlider";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <LandingSlider />
      <div class="buttons">
        <div class="container">
          <a href="/home" class="btn effect04" data-sm-link-text="Enter">
            <span>GAMES</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
