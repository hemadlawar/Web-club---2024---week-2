import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "f0852da6f6c8c94a01272a1b4da07455";

  const [titles, setTitles] = useState({
    headers: "Weather Forecast App",
    Get_Weather: "Get Weather",
    Temperature: "Temperature",
    Description: "Description",
    Feels_like: "Feels like",
    Humidity: "Humidity",
    Pressure: "Pressure",
    Wind_Speed: "Wind Speed",
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const convertToKurdish = () => {
    setTitles({
      headers: "پلاتفۆرمی كه‌ش و هه‌وا",

      Get_Weather: "زانینی كه‌ش و هه‌وا",
      Temperature: "پله‌ی گه‌رمی",
      Description: "وەسف",
      Feels_like: "هه‌ست پێكردن",
      Humidity: "شێ",
      Pressure: "په‌ستانی هه‌وا",
      Wind_Speed: "خێرایی با",
    });
  };

  const convertToEnglish = () => {
    setTitles({
      headers: "Weather Forecast App",
      Get_Weather: "Get Weather",
      Temperature: "Temperature",
      Description: "Description",
      Feels_like: "Feels like",
      Humidity: "Humidity",
      Pressure: "Pressure",
      Wind_Speed: "Wind Speed",
    });
  };

  return (
    <div>
      <div>
        {" "}
        <button onClick={convertToKurdish}>كوردی </button>
        <button onClick={convertToEnglish}>English </button>
      </div>
      <h1>{titles.headers}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">{titles.Get_Weather}</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>
            {titles.Temperature}: {weatherData.main.temp}°C
          </p>
          <p>
            {titles.Description}: {weatherData.weather[0].description}
          </p>
          <p>
            {titles.Feels_like} : {weatherData.main.feels_like}°C
          </p>
          <p>
            {" "}
            {titles.Humidity} : {weatherData.main.humidity}%
          </p>
          <p>
            {titles.Pressure} : {weatherData.main.pressure}
          </p>
          <p>
            {titles.Wind_Speed} : {weatherData.wind.speed}m/s
          </p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
