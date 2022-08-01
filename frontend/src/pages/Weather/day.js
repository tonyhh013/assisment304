import React from 'react'
import "./styles.css";
function Day(props) {
  //var img=`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${props.data.ForecastIcon}.png`
  return (
    <div className="Day">
      <h3>{props.data.week}</h3>
      <span>{props.data.forecastDate}</span>
      <br/>
      <img src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${props.data.ForecastIcon}.png`} alt="weather" width="55" height="55"/>
      <br/>
      <br/>
      <p>{props.data.forecastWind}</p>
      High: {props.data.forecastMaxtemp.value} °C
      <br/>
      Low: {props.data.forecastMintemp.value} °C
      <br/>
    </div>
  )
}

export default Day