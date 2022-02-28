import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
