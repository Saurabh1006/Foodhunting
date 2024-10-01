import React from 'react'
import Header from '../Header/Index'
import Footer from '../Footer/Footer'
import ResturantList from '../Resturant/ResturantList'
import Search from '../../pages/Search'
const Home = () => {
  return (
    <div>
      <div  className=' flex flex-col'>
      <Header/>
      <Search/>
      <ResturantList/>
      <Footer/>
      </div>
    </div>
  )
}

export default Home
