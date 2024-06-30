import React from 'react'
import HeroSlider from './HeroSlider'
import Headline from './Headline'
import NearestPlace from './NearestPlace'
import PdfComponent from './PdfComponent'
import TempleMap from './TempleMap'


const Home = () => {
  return (
    <div>
        <HeroSlider />
        <Headline />
        <NearestPlace />
        <PdfComponent/>
        <TempleMap/>
    </div>
  )
}

export default Home