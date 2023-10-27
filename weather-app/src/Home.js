import React from 'react'
import './style.css'

function Home() {
  return (
    <div className='container'>
        <div className="weather">
            <div className='search'>
                <input type="text"
                placeholder='Enter City Name'/>
                <button><img src="/" alt/></button>
            </div>
        </div>
      
    </div>
  )
}

export default Home
