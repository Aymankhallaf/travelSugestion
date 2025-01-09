import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import TravelDate from './TravelDate';

export function Search() {
    const [temperature, setTemperature] = useState(25);
    const [activity, setActivity] = useState("beach");
    const [date, setDate] = useState('');


    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form>
            <label>Search: </label>
            <TemperatureSearch temperature={temperature} setTemperature={setTemperature} />
            <Activity />
            <TravelDate />
            <button onClick={handleSearch}>Search</button>

        </form>
    );
}