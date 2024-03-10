import React from 'react'
import IndividualIntervalsExample from './IndividualIntervalsExample'
import Grid from './Grid'

const Home = () => {
  return (
    <div className='content'><IndividualIntervalsExample/>
    <div style={{height:"100px",textAlign:"center"}}>
      <h1 style={{marginTop:"100px" , fontFamily:"Noto Sans" , fontWeight:"680"}}>This Week’s Highlights</h1>
    </div>
    <Grid/>
    </div>
  )
}

export default Home