
export default class WeatherService{
    static API_KEY_WEATHER = process.env.REACT_APP_API_KEY_WEATHER;
    static API_KEY_CITY = process.env.REACT_APP_API_KEY_CITY;
    static async getWeatherData(city){
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WeatherService.API_KEY_WEATHER}&q=${city}&days=15&lang=ru`);
        let dataWeather = await response.json();
        return dataWeather;
    }
    static async cityName(lat, long){
        let response = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${WeatherService.API_KEY_CITY}&query=${lat},${long}`);
        let geoDataCity = await response.json();
        return geoDataCity.data[0].region;
    }

}

