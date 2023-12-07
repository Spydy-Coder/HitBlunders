import React from 'react'
import HomeContent from '../../Components/HomeContent/HomeContent'
//import Navbar from '../../Components/Navbar/Navbar'
import Signup from '../../Components/Signup/Signup'
import Connect from '../../Components/Connect/Connect'

function Homepage() {
  return (
    <div>
      {/*<Navbar/>*/}
      <HomeContent/>
      <Signup/>
      <Connect/>
    </div>
  )
}

export default Homepage

