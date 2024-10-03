import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {ReactLocation} from '@tanstack/react-location';
const LocationTracter = () => {
    const [location, setLocation] = useState({latitude:null,longitude:null});
    const [error, setError] = useState(null);
//  Location finding Success method
   const handleSuccess=(position)=>{
  const {latitude,longitude} = position.coords;
  setLocation({latitude,longitude});
   }
   const Errorhandling =(error)=>{
    setError(error.message);
   }

   useEffect(()=>{
    if(navigator.geolocation){
        navigator.geolocation.watchPosition(handleSuccess,Errorhandling,{
            enableHighAccuracy:true,
            timeout:15000,
            maximumAge:0
        })
    }else{
        setError("Location is not Supported by the browers")
    }
   },[])

  return (
    <div>
      {error?console.log(error):console.log(location.latitude,location.longitude)}
    </div>
  )
}

export default LocationTracter
