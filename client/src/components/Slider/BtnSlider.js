 import React from 'react';
 import './Slider.css'

 export default function BtnSlider({direction, moveSlide}) {
   return (
     <div>
       <button onClick={moveSlide} className={direction === "next" ? 'btn-slide next' : 'btn-slide prev'}>
         <i class={direction === 'next' ? "fas fa-chevron-right" : "fas fa-chevron-left" } style={{fontSize:"20px", color:"#be624e"}}></i>
       </button>
     </div>
   )
 }
 