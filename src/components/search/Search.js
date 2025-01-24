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
    const [destinations, setDestinations] = useState([]);


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