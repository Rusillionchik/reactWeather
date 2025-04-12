import "./App.css";
import React from "react";
import { useState } from "react";

const API_KEY = "33abd6c3a8210104d0e2b651829bc98b";

function App() {
  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState("");

  const onClickSearchWeather = async event => {
    event.preventDefault();
    if (city === "") {
      alert("Поле ввода пустое");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
      setCity("");
    } catch (err) {
      console.log("Ошибка получения данных", err);
    }
  };
  return (
    <div className="weather">
      <h1>Погода</h1>
      <form className="weather__form" onSubmit={onClickSearchWeather}>
        <input
          className="weather__input"
          type="text"
          placeholder="город"
          value={city}
          onChange={event => setCity(event.target.value)}
        ></input>
        <button
          className="weather__button"
          type="submit"
          // onClick={onClickSearchWeather}
        >
          <svg
            className="weather_logo"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </button>
      </form>
      {weather.name !== undefined ? (
        <>
          {" "}
          <h2 className="weather__city">{weather.name}</h2>
          <p className="weather__temp">
            {Math.round(weather.main.temp - 273)}°C
          </p>
          <p className="weather__info">
            {weather.weather[0] !== null
              ? weather.weather[0].main
              : "Данные о погоде неизвестны"}
          </p>{" "}
        </>
      ) : null}
    </div>
  );
}

export default App;
