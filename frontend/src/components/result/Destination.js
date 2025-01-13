import React, { useState } from "react";


export function Destination({ destination }) {


    return (
        <li key={destination.id}>
            <h2>{destination.name}, {destination.country}</h2>
            <p>Temperature: {destination.temperature}°C</p>
            <p>Weather: {destination.weather}</p>
            <p>Activities: {destination.activities.join(', ')}</p>
        </li>
    );
}