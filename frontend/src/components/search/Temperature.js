import React from 'react';
import { FaTemperatureHalf } from "react-icons/fa6";



export function TemperatureSearch({ temperature, setTemperature }) {



  return (
    <div className="flex-1 relative">
      <label htmlFor="temperature" className="sr-only">
        Preferred Temperature (°C):
      </label>
      <FaTemperatureHalf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id='temperature'
        className="mt-1 block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        type="number"
        value={temperature}
        onChange={(e) => {
          setTemperature(Number(e.target.value));
        }}
      />
    </div>);
}