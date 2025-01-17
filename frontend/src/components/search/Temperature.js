import React from 'react';



export function TemperatureSearch({ temperature, setTemperature }) {



  return (<div className='flex-1'>
    <label>Preferred Temperature (°C): </label>
    <input
      type="number"
      value={temperature}
      onChange={(e) => {
        setTemperature(Number(e.target.value));
      }}
    />
  </div>);
}