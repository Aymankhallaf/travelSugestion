import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import { TravelDate } from './TravelDate';
import { Destination } from '../result/Destination';
import { fetchDestinations } from '../api/activity';
import { fetchWeather } from '../api/weather';

export function Search() {
    const [temperature, setTemperature] = useState(25);
    const [activity, setActivity] = useState("beach");
    const [traveldate, setTravelDate] = useState();
    const [destinations, setDestinations] = useState([{
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
    },]);


    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(`Temperature: ${temperature}`);
        console.log(`Activity: ${activity}`);
        console.log(`Travel Date: ${traveldate}`);
        try {
            const destinations2 = await fetchDestinations(activity);
            console.log(destinations2);
        }
        catch(error) {
            console.error('Error fetching destinations:', error);

        }; 
        // try {
        //         const weather = await fetchWeather("paris", '2025-01-10');
        //         console.log(weather);
        //     }
        //     catch(error) {
        //         console.error('Error fetching weather:', error);
    
        //     }; 
        
    }

        return (
            <div>
                <form>
                    <label>Search: </label>
                    <TemperatureSearch temperature={temperature} setTemperature={setTemperature} />
                    <Activity activity={activity} setActivity={setActivity} />
                    <TravelDate traveldate={traveldate} setTravelDate={setTravelDate} />
                    <button onClick={handleSearch}>Search</button>
                </form>
                <ul>
                    {destinations.map((destination) => (
                        <Destination key={destination.id} destination={destination} />
                    ))
                    }
                </ul>
            </div>
        );
    }