import React, { useState } from 'react';
import './Slider.css';
import BtnSlider from './BtnSlider';
import dataSlider from './dataSlider'



export default function LandingSlider  () {

  const[slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
    if(slideIndex !== dataSlider.length){
      setSlideIndex(slideIndex +1 )
    } else if (slideIndex === dataSlider.length){
      setSlideIndex(1);
    }
  }

  const prevSlide = () => {
    if(slideIndex !== 1){
      setSlideIndex(slideIndex -1)
    } else if (slideIndex === 1){
      setSlideIndex(dataSlider.length)
    }
  }

  const moveDot = index => {
    setSlideIndex(index);
  }
  return (
    <div className="container-slider">
       {dataSlider.map((obj, i) => {
         return (
           <div key={obj.id} className={slideIndex === i + 1 ? "slide active-anim" : "slide" }>
             <img className="borderImage" src={process.env.PUBLIC_URL + `/img/img${i + 1}.jpg`}/>
           </div>
         )
        })}
   
        <BtnSlider moveSlide={nextSlide} direction={"next"} /> 
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />    
      

        <div className="container-dots">
          {Array.from({length:4}).map((item, i) => (
            <div className={slideIndex === i + 1 ? 'dot active' : 'dot'}
            onClick={() => moveDot(i +1)}></div>
          ))}
        </div>   
    </div>
  )
}
