import React, { useState } from 'react'
import './App.css';
import { useEffect } from 'react';
import WeatherService from './API/fetchWeatherAPI';

import { useDispatch } from 'react-redux'
import MainCard from './MainCard/MainCard.jsx';
import Cards from './Cards/Cards';
import { formatData } from './utils/formatData';
import geoImg from './img/geo_black.png';


function App() {
  const dispatch = useDispatch();
 
  const [city, setCity] = useState("Saint-Petersburg");
  const [isDay, setIsDay] = useState(true);
  const [value, setValue] = useState("");
  

  useEffect( () => {
    async function fetchData(){ 

      const data = await WeatherService.getWeatherData(city);
      if (data.error){
        alert("Город не найден. Проверьте правильность написания");
        return;
      }
      
      dispatch(formatData(data));
      const hours = new Date(data?.location?.localtime).getHours(); 
      if (hours >= 21 || hours <= 7){
        setIsDay(false);
      }else{
        if (isDay === false)  setIsDay(true);
      }
      }
      fetchData();
  }, [city]);

   
  function getDataLocation(){ 
    async function success(pos) {
      const crd = pos.coords;
      const data = await WeatherService.cityName(crd.latitude,crd.longitude);
      setCity(data);
      setValue(data);
    };
   navigator.geolocation.getCurrentPosition(success);
    };



  return (
    <div className={isDay ? "App" : "App dark"} >
      <header>
      <input type="text" className="input__city" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите название города по английский" />
      <button className="header__btn search__btn " onClick={() => setCity(value)}>Найти город</button>
      <br />
      <button className="geo_btn  header__btn" onClick={() => getDataLocation()}>  <img src={geoImg} alt="geo" /> <span>По местоположению</span></button>
      </header>
      <>
      <div className="main__section">
        <MainCard ></MainCard>
      </div>
      <div className="bottom__section">
          <Cards ></Cards>
      
      </div>
      </>
    </div>
  );
}

export default App;