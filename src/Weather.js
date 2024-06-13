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
    <div className="p-4   bg-[url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg')] w-full  h-screen bg-cover">
      {/**buttons for converting languages */}
      <div className="flex mb-4 flex justify-end">
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
          onClick={convertToKurdish}
        >
          كوردی
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={convertToEnglish}
        >
          English
        </button>
      </div>
      {/** headers title  */}
      <h1 className="text-3xl font-bold mb-5  flex justify-center text-yellow-50 mb-16">
        {titles.headers}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="border border-gray-400 rounded px-4 py-2 "
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          {titles.Get_Weather}
        </button>
      </form>
      {weatherData ? (
        <>
          <div className=" ml-custom mt-7">
            <h2 className="text-xl font-bold mb-2 text-white">
              {weatherData.name}
            </h2>
            <p className="text-white">
              <span className="font-bold   ">{titles.Temperature}:</span>{" "}
              {weatherData.main.temp}°C
            </p>
            <p className="text-white">
              <span className="font-bold ">{titles.Description}:</span>{" "}
              {weatherData.weather[0].description}
            </p>
            <p className="text-white">
              <span className="font-bold  ">{titles.Feels_like} :</span>{" "}
              {weatherData.main.feels_like} °C
            </p>
            <p className="text-white">
              <span className="font-bold " text-white>
                {titles.Humidity} :
              </span>{" "}
              {weatherData.main.humidity}%
            </p>
            <p className="text-white">
              <span className="font-bold  ">{titles.Pressure} :</span>{" "}
              {weatherData.main.pressure}
            </p>
            <p className="text-white">
              <span className="font-bold  ">{titles.Wind_Speed} :</span>{" "}
              {weatherData.wind.speed}m/s
            </p>
          </div>
        </>
      ) : (
        <p className="mt-96">By Hema DO</p>
      )}
    </div>
  );
};

export default Weather;
