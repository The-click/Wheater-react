import React from 'react';
import './Cards.css';
import windImg from '../img/windy.svg'
import { useSelector } from 'react-redux';

function Cards() {
   
    const cards = useSelector(state => state.daysData.forecastDays);  

    if (cards.length === 0) return;
   
    const month =  [
        "января", "февраля", "марта",
        "апреля", "мая", "июня",
        "июля", "августа", "сентября",
        "октября", "ноября", "декабря"
    ];
    const weekDay = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ]
    let answer = cards.map((card, i) => {
        let nowDay = new Date(+card.date + (i * 3600000));
        return ( <div className="cards" key={card.date}>
        <div className="cards__date">
            <span>{i !== 0 ? (weekDay[nowDay.getDay()]) : "Сегодня"}</span>
            <span className="cards__text_dark">{ nowDay.getDate() + " " + month[nowDay.getMonth()]}</span>
        </div>
        <img className="cards__img" src={`./weather_pic/day/${card.condition.image}`} alt="weather" />
        <div className="cards__text cards__text_dark">
            {card.condition.text}
        </div>
        <div className="cards__temp">
            <span>{card.temp.maxtemp}</span>
            <span className="cards__text_dark">{card.temp.mintemp}</span>
        </div> 
        <div className="cards__wind cards__text_dark">
        <img src={windImg} alt="wind" />
          <span className='windy'>
            {card.wind}
          </span>
        </div>

    </div>);
    })
 
    return (
        <div className="cards__wrap">{
            answer
        }
        </div>
        
       
    );
}

export default Cards;