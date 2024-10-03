import React from 'react'
import ShimmerCard from './ShimmerCard'
import { useEffect } from 'react'
import { useState } from 'react'
import mainData from '../../assets/JsonData/Main_Course.json'
import Beverages from './Beverages'
import Dessert from './desserts';
import MainCourse from './MainCourse';
const ResturantList = () => {
  const [restaurants, setRestaurants] = useState(mainData);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (restaurants.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [restaurants]);
  return (
    <div>
       <div className='container-max'>
      <MainCourse/>
      <Beverages/>
      <Dessert/>

    
    </div>
    </div>
  )
}

export default ResturantList
