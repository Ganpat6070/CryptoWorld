import React from 'react'
import './Banner.css';
import Carousel from './Carousel';
import CoinsTable from './CoinsTable';

const Banner = () => {
  return (
    <div className='background-image'>
      <div className='bannerContent'>Crypto World</div>
        <div className='tagline'>
          <p className='tagline'>Welcome to the world of Crypto</p><br/>
          <p className='tagline'>Get all the live data of Crypto Market.</p>
        </div>
        <Carousel/>
        <CoinsTable/>
    </div>
  )
}

export default Banner