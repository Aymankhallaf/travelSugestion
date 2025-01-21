import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import { TravelDate } from './TravelDate';
import { Destination } from '../result/Destination';
import { FaSearch } from 'react-icons/fa';

import axios from 'axios';


export function Search() {
    const [temperature, setTemperature] = useState(25);
    const [activity, setActivity] = useState("beach");
    const [traveldate, setTravelDate] = useState();
    // const [destinations, setDestinations] = useState([{
    //     id: 1,
    //     name: 'Phuket',
    //     country: 'Thailand',
    //     temperature: 27,
    //     weather: 'Sunny',
    //     activities: ['Patong Beach', 'Phi Phi Islands'],
    // },
    // {
    //     id: 2,
    //     name: 'Canary Islands',
    //     country: 'Spain',
    //     temperature: 22,
    //     weather: 'Partly Cloudy',
    //     activities: ['Playa de las Canteras', 'Maspalomas Dunes'],
    // },
    // {
    //     id: 3,
    //     name: 'Maui',
    //     country: 'Hawaii',
    //     temperature: 25,
    //     weather: 'Sunny',
    //     activities: ['Wailea Beach', 'Road to Hana'],
    // },]);
    // Results to test API calls;
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        // Prepare the data to send
        const searchData = {
            temperature: temperature,
            activity: activity,
            traveldate: traveldate,
        };

        try {
            // Send a POST request to the backend using Axios
            const response = await axios.post('http://localhost:8080/backend/api.php', searchData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = response.data;
            console.log(data);
            setResults(data.results || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResults([]);
        }
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <div className="h-screen content-center	bg-teal-400 ">
                <h2 className='text-red-950'>Search: </h2>
                <form className='flex flex-col md:flex-row gap-2'>
                    <TemperatureSearch temperature={temperature} setTemperature={setTemperature} />
                    <Activity activity={activity} setActivity={setActivity} />
                    <TravelDate traveldate={traveldate} setTravelDate={setTravelDate} />
                    <div className="relative">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                            <button  
                                type="submit"
                                className="mt-1 block w-full pl-10 pr-4 py-3 bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                aria-label="Search"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h2 className='bg-black'>Results</h2>
                {Array.isArray(results) && results.length > 0 ? (
                    results.map((result, index) => (
                        <Destination key={index} destination={result} />
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>

    );
}