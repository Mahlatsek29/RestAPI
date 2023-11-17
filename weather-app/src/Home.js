import React, { useState } from 'react';
import axios from 'axios';
import search from './images/search.png';
import clouds from './images/cloudy.png';
import wind from './images/wind.png';
import rain from './images/rain.png';
import clear from './images/clear-sky.png';
import drizzle from './images/drizzle.png';
import mist from './images/mist.png';

import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: './images/cloudy.png'
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=462e1dc9c41358e13659fbe8c30ae5a0&units=metric`;
      axios.get(apiUrl)
        .then((res) => {
          let imagePath = '';
          if (res.data.weather[0].main === "Clouds") {
            imagePath = clouds;
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = clear;
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = rain;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = drizzle;
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = mist;
          } else {
            imagePath = clouds;
          }

          console.log(res.data);
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath
          });
          setError('');
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setError('Invalid City Name');
          } else {
            setError('An error occurred while fetching data');
          }
        });
    } else {
      setError('Please enter a city name');
    }
  };

  return (
    <div className='container'>
      <div className="weather">
        <div className='search'>
          <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button><img src={search} alt="Search" onClick={handleClick} /></button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="Weather" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src={data.image} alt='' />
            </div>
            <p>{Math.round(data.humidity)}</p>
            <p>Humidity</p>
          </div>
          <div className='col'>
            <div className='wind'>
              <img src={wind} alt='' />
            </div>
            <p>{Math.round(data.speed)}</p>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
