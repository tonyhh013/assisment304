import React from 'react'
import { useEffect, useState } from 'react';
import {Navbar} from '../../components/navbar';
import axios from "axios";
import Day from "./day";
import './styles.css';
import {
  Container,
} from './styles';
function Weather() {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function fetchData(){
        
        const response = await axios.get(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en` , {
          headers: {
            "Content-Type": "application/json",
          }
        });
        setData(response.data.weatherForecast);
        
      }
      fetchData()
      }, []) 
  return (
    <>
    <Navbar />
    <Container>
    {data && data.map(e=> (
          <Day 
            key={e.forecastDate} 
            data={e}
          />
        )
      )}
    </Container>
    

      
    </>
    
  )
}

export default Weather