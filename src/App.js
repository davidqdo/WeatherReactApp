import { useState } from "react";
import {RainDrops, RainDropsBG, SnowDrops} from "./Weather.js";
/* Weather API */
const api = {
  key: "2a371191d68e6c42d89404f7437faa0a",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
      /* Change the screen color based on user-submitted location and its temperature */
        ? ((weather.main.temp <= 8) ? 'app cold' : /* Cold Weather */
          (weather.main.temp > 8 && weather.main.temp <= 16) ? 'app cool' : /* Cool Weather */
          (weather.main.temp > 16 && weather.main.temp <= 24) ? 'app warm' : /* Warm Weather */
          (weather.main.temp >= 25) ? 'app hot' : /* Hot Weather */
          'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..." 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>  
          </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="temp">{Math.round((weather.main.temp * (9/5)) + 32)}°F</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className={
                (typeof weather.weather[0].id != "undefined") ?
                /* Change Weather Symbol depending on current weather IDs */
                ((200 <= weather.weather[0].id && weather.weather[0].id <= 531) ? 'rain-sym' : /* Rainy Weather */
                (600 <= weather.weather[0].id && weather.weather[0].id <= 622) ? 'snow-sym' : /* Snowy Weather */
                (701 <= weather.weather[0].id && weather.weather[0].id <= 781) ? 'hazard-sym' : /* Hazardous Weather */
                (801 <= weather.weather[0].id && weather.weather[0].id <= 804) ? 'cloud-sym' : /* Cloudy Weather */
                'sun-sym') : 'sun-sym'} /* Default Sunny Weather */> 
              </div>
              {200 <= weather.weather[0].id && weather.weather[0].id <= 531 && /* Rainy Weather Symbol */
                <div>{RainDrops()} {RainDropsBG()}</div>
              }
              {600 <= weather.weather[0].id && weather.weather[0].id <= 622 && /* Snowy Weather */
              <div>{SnowDrops()}</div>
              }
              {701 <= weather.weather[0].id && weather.weather[0].id <= 781 && /* Hazardous Weather */
              <div></div>
              }
              {weather.weather[0].id === 800 &&                                 /* Sunny / Clear Weather */
              <div></div>
              }
              {801 <= weather.weather[0].id && weather.weather[0].id <= 804 && /* Cloudy Weather */
              <div></div>
              }
            </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
