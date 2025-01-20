import React from 'react';
import { FaTemperatureHalf } from "react-icons/fa6";



export function TemperatureSearch({ temperature, setTemperature }) {



  return (
    <div className='flex-1 block overflow-hidden bg-white border-gray-200 rounded-lg	px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
      <label className=''>Preferred Temperature (°C): </label>
      <FaTemperatureHalf />
      <input
        className='mt-1 w-full border-none p-0'
        type="number"
        value={temperature}
        onChange={(e) => {
          setTemperature(Number(e.target.value));
        }}
      />
    </div>);
}