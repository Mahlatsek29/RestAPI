import React, { useState, useEffect } from 'react';
import axios from 'axios';
import search from './images/search.png';
import clouds from './images/clouds.png';
import wind from './images/wind.png';
import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
  });
  const [name, setName] = useState('');

  useEffect(() => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=462e1dc9c41358e13659fbe8c30ae5a0&units=metric`;
      axios.get(apiUrl)
        .then((res) => {
          console.log(res.data);
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [name]);

  const handleClick = () => {
   
  };

  return (
    <div className='container'>
      <div className="weather">
        <div className='search'>
          <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button><img src={search} alt="Search" onClick={handleClick} /></button>
        </div>
        <div className="winfo">
          <img src={clouds} alt="Clouds" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src={clouds} alt='' />
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
