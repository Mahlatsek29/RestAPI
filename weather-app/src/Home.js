import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import search from './images/search.png';
import clouds from './images/clouds.png';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2
  });

  useEffect(() => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=462e1dc9c41358e13659fbe8c30ae5a0&units=metric";
    axios.get(apiUrl)
      .then(res => {
        setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed });
      })
      .catch(err => console.log(err));
  }, [data]);

  return (
    <div className='container'>
      <div className="weather">
        <div className='search'>
          <input type="text" placeholder='Enter City Name' />
          <button><img src={search} alt="Search" /></button> 
        </div>
        <div className="winfo">
          <img src={clouds} alt="Clouds" />
          <h1>{data.celcius}°c</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src='/' alt='' />
            </div>
            <p>{data.humidity}</p>
            <p>Humidity</p>
          </div>
          <div className='col'>
            <div className='col'>
              <img src='/' alt='' />
            </div>
            <p>2 km/h</p>
            <p>{data.speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
