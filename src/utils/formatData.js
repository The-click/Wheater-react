import { loadCurrentDay, loadForecastDays } from "../store/daysReducer";

export const formatData = (dataWeather) => { 
    let currentDayData = dataWeather.forecast.forecastday;
    let days = [];
    for(let i = 0; i < currentDayData.length; i++){
      days.push({
        date: +new Date(currentDayData[i].date),
        temp: {maxtemp: addPlusTemp(currentDayData[i].day.maxtemp_c), mintemp:addPlusTemp(currentDayData[i].day.mintemp_c) },
        condition: {image: currentDayData[i].day.condition.icon.match(/\/\d{3}.png/)[0], text:currentDayData[i].day.condition.text },
        wind: Math.trunc(+currentDayData[i].day.maxwind_mph * 0.44704) + " м/с",
      });
    };
   
    currentDayData = dataWeather.current;
  
    let nowDay = {
      date: dataWeather.location.localtime,
      location: dataWeather.location.name + ", " + dataWeather.location.country,
      temp: { realtemp: addPlusTemp(currentDayData.temp_c), feelslike: addPlusTemp(currentDayData.feelslike_c)},
      condition: {image: currentDayData.condition.icon.match(/(day|night)\/\d{3}.png/)[0], text: currentDayData.condition.text} ,
      pressure: Math.trunc(currentDayData.pressure_mb * 0.750062) + " мм рт. ст.",
      humidity: currentDayData.humidity + "%", 
      wind: {speed: Math.trunc(+currentDayData.wind_mph * 0.44704) + " м/с", direction: transDirWindy(currentDayData.wind_dir)},
    };
    
    return  dispatch => {  
        try{
        dispatch(loadCurrentDay(nowDay));
        dispatch(loadForecastDays(days))
        }catch(e){
            console.log(e);

        }
    }
}

function addPlusTemp(temp){
    if (temp > 0) return "+" + temp + "°";
    return temp + "°";
  }

  function transDirWindy(dir){
    let answer = "";
    for (let i = 0; i < 2; i++){
      switch(dir[i]){
        case "N":
          answer += "С";
          break;
        case "S":
          answer += "Ю";
          break;
        case "W":
          answer += "З";
          break;
        case "E":
          answer += "В";
          break;
        default:
          break;
      }
    }
    return answer;
  }

