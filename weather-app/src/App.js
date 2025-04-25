// import logo from './logo.svg';
import React, { useState} from "react";
import './App.css';
import Loading from './components/Loading';



function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState("");

  const getWeather  = async () => {
    if(!city) return;
    const apiKey = "4b98b12e71b859169504c36a9041653d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
      setLoading(true);
      SetError("");
      const response  = await fetch(url);
      const data  = await response.json();
      if (data.cod === "404"){
        SetError("City Not found!");
        setWeather(null);
        setCity("");
        setLoading(false);
      } else{
        setWeather(data);
      }
      setCity("");
      setLoading(false);

    } catch (err){
      SetError("Something Went Wrong!");
      setLoading(false);
        }
  };
    return (
    <div className="App">
      <h1>⛈ Weather App</h1>
      <input 
      type="text"
      placeholder="Enter City name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {loading && <Loading/>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && !loading && <p style={{ color: "green" }}>Weather data loaded!</p>}

      



      {weather && (
        <div className=""weather-info>
          <h2>{weather.name}, {weather.sys.counter}</h2>
          <p>Temperature:{weather.main.temp}C</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <img
          src ={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt ="weather-icon"
          />
          </div>
      )}
    </div>
  );
}

export default App;
