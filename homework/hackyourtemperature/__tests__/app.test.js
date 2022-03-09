//import  from "../app.js";
import supertest from "supertest";
import { app, weatherInfo } from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  test("should respond with status code 200 if request is correct", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" });
    expect(response.statusCode).toBe(200);
  });

  test("should respond with cityName and temperature", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" });
    expect(response.body.weatherText).toEqual(
      expect.stringContaining(`Amsterdam ${weatherInfo.main.temp} C`)
    );
  });

  test("should respond with the 404 status code if request is incorrect", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Adasdasdad" });
    expect(response.statusCode).toBe(404);
  });

  test("should respond with city not found message status code if request is incorrect", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Adasdasdad" });
    expect(response.body.weatherText).toEqual(
      expect.stringContaining("city not found")
    );
  });

  test("should respond with the 400 status code if request doesn't have cityName", async () => {
    const response = await request.post("/weather").send({ cityName: "" });
    expect(response.statusCode).toBe(400);
  });

  test("should respond with Nothing to geocode message status code if request doesn't have cityName", async () => {
    const response = await request.post("/weather").send({ cityName: "" });
    expect(response.body.weatherText).toEqual(
      expect.stringContaining("Nothing to geocode")
    );
  });
});
