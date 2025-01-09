import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import { TravelDate } from './TravelDate';

export function Search() {
    const [temperature, setTemperature] = useState(25);
    const [activity, setActivity] = useState("beach");
    const [traveldate, setTravelDate] = useState();
    const [destinations] = useState( [
        {
          id: 1,
          name: 'Phuket',
          country: 'Thailand',
          temperature: 27,
          weather: 'Sunny',
          activities: ['Patong Beach', 'Phi Phi Islands'],
        },
        {
          id: 2,
          name: 'Canary Islands',
          country: 'Spain',
          temperature: 22,
          weather: 'Partly Cloudy',
          activities: ['Playa de las Canteras', 'Maspalomas Dunes'],
        },
        {
          id: 3,
          name: 'Maui',
          country: 'Hawaii',
          temperature: 25,
          weather: 'Sunny',
          activities: ['Wailea Beach', 'Road to Hana'],
        },
      ]);


    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Temperature: ${temperature}`);
        console.log(`Activity: ${activity}`);
        console.log(`Travel Date: ${traveldate}`);
    };
 
    return (
        <div>
            <form>
                <label>Search: </label>
                <TemperatureSearch temperature={temperature} setTemperature={setTemperature} />
                <Activity activity={activity} setActivity={setActivity} />
                <TravelDate traveldate={traveldate} setTravelDate={setTravelDate} />
                <button onClick={handleSearch}>Search</button>
            </form>
            <destinations destinations={destinations} />
        </div>
    );
}