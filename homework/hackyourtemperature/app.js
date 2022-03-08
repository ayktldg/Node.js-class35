import express from "express";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const weatherData = await getWeatherData(cityName);
    res.send(weatherData);
  } catch (err) {
    console.log(err);
  }
});

const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  if (!data.name) {
    return { weatherText: data.message };
  } else {
    return { weatherText: `${data.name} ${data.main.temp} C` };
  }
};

export default app;
