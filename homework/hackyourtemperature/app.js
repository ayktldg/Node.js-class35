import express from "express";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

const app = express();
let weatherInfo = {};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const weatherData = await getWeatherData(cityName);
    if (weatherData.cod === 200) {
      weatherInfo = weatherData;
      res.status(200).send({
        weatherText: `${weatherData.name} ${weatherData.main.temp} C`,
      });
    } else {
      res.status(parseInt(weatherData.cod)).send({
        weatherText: weatherData.message,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export { app, weatherInfo };
