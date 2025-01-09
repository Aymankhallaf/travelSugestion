import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import TravelDate from './TravelDate';

export function Search() {  

    const handleSearch = () => {

        console.log("Search button clicked");
    };

    return (
        <form>
            <label>Search: </label>
            <TemperatureSearch />
            <Activity />
            <TravelDate />
            <button onClick={handleSearch}>Search</button>

        </form>
    );
}