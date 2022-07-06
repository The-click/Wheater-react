import React from 'react';
import "./MainCard.css"
import windImg from '../img/windy.svg'; 
import humidityImg from '../img/humidity.svg';
import pressureImg from '../img/pressure.png';
import { useSelector } from 'react-redux';

const MainCard = () => {
    const currentDay = useSelector(state => state.daysData.currentDay);

    if (Object.keys(currentDay).length === 0) return;
    
    return (
        <div className="card">
          <div className="card__time card__data_abs">
            Местное время: {currentDay.date.split(" ")[1]}
          </div>
          <div className="card__location card__data_abs">
            {currentDay.location}
          </div>
        <div className="card__main">
          
          <div className="card__main_option">
             <img src={`./weather_pic/${currentDay.condition.image}`} alt="weather" />
             <span className='card__temp'> {currentDay.temp.realtemp}</span>
             <span className="card__text">
          {currentDay?.condition?.text}
          </span>
          <span className="card__feel-temp">
            Ощущается как  {currentDay.temp.feelslike}
          </span>
          </div>
  
        </div>
        <div className="card__under-main">
        <div className="card__wind card__option">
       <img src={windImg} alt="wind" />
          <span className='windy'>
            {currentDay?.wind?.speed}
          </span>
          <span className='windy'>
            {currentDay?.wind?.direction}
          </span>
        </div>
        <div className="card__humidity card__option">
          <img src={humidityImg} alt="humidity" />
          <span className='humidity'>
            {currentDay?.humidity}
          </span>
        </div>
        <div className="card__pressure card__option">
          <img src={pressureImg} alt="humidity" />
          <span className='pressure'>
            {currentDay?.pressure}
          </span>
        </div>
        </div>

      </div>
    );
};

export default MainCard;