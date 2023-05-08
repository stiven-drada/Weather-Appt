import { getCoordeinates } from './services/getCoordinates';
import { getCurrentWeather } from './services/getCurrentWeather';
import { useEffect, useState } from 'react'
import { PascalCase } from './utils/PascalCase';
import './App.css'

function App() {
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(()=>{
    const loadWeather = async () => { 
      const coordinates = await getCoordeinates();
      if (coordinates){
        const weatherData = await getCurrentWeather(coordinates.latitude,coordinates.longitude);
        setWeather(weatherData);
      }
      
    };

    loadWeather();
  },[]
  );

  return (
   <div className='container_app'>
    {weather? <h1><b>{weather.city}, {weather.country}</b></h1>: <p>Loading</p>}
  {weather? (
    <>
      <article className='container_app_info'>
        <p><b>{PascalCase( weather.weather.description)}</b></p>
        <p>
          {isCelsius
            ? weather.temperature.celsius.toFixed(0)
            : weather.temperature.farenheit.toFixed(0)}{" "}
          °{isCelsius ? "C" : "F"}
        </p>
        <div className='container_app_info_icon'>

          <img
            src ={weather.weather.icon}
            alt={weather.weather.description}
          />
        </div>
      </article>

      <button onClick={() => setIsCelsius(!isCelsius)}>Change °{isCelsius ? 'F' : 'C'}</button>
    </>
  ) : (
    <p>Loading weather </p>
  )}
  </div>
  );
 }
export default App;
