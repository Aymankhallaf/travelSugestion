import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import {TravelDate} from './TravelDate';

export function Search() {
    const [temperature, setTemperature] = useState(25);
    const [activity, setActivity] = useState("beach");
    const [traveldate, setTravelDate] = useState();


    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Temperature: ${temperature}`);
        console.log(`Activity: ${activity}`);
        console.log(`Travel Date: ${traveldate.toString()}`);
    };

    return (
        <form>
            <label>Search: </label>
            <TemperatureSearch temperature={temperature} setTemperature={setTemperature} />
            <Activity activity={activity} setActivity={setActivity} />
            <TravelDate traveldate={traveldate} setTravelDate={setTravelDate} />
            <button onClick={handleSearch}>Search</button>

        </form>
    );
}