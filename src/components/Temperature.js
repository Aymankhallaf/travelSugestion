import React, {useState} from 'react';



export function TemperatureSearch() {
  const [temperature, setTemperature] = useState(25);

    return (<div>
        <label>Preferred Temperature (°C): </label>
        <input
          type="number"
          value={temperature}
          onChange={(e) =>{ 
            setTemperature(e.target.value);
        console.log(e.target.value); }}
        />
      </div>);
}