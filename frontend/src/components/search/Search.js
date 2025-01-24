import React, { useState } from 'react';
import { TemperatureSearch } from './Temperature';
import { Activity } from './Activity';
import { TravelDate } from './TravelDate';
import { Destination } from '../result/Destination';
import { FaSearch } from 'react-icons/fa';
import SearchBg from '../../assets/img//bg-search.webp'
import axios from 'axios';
import Header from './header';


export function Search() {
    const [temperature, setTemperature] = useState(25);
    const [activity, setActivity] = useState("beach");
    const [traveldate, setTravelDate] = useState();
    // Results to test API calls;
    const [results, setResults] = useState([]);
    // track loading state(to disable/enable search button)
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=''>
            <Header />
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${SearchBg})`,
                }}
                className="bg-cover bg-center h-screen bg-no-repeat">
                <div className='w-full max-w-4xl mx-auto flex flex-col gap-10'>
                    <h2 className='mt-20 text-4xl font-bold font-sans text-white'>La Beauté du Monde à Portée de Clic!</h2>
                    <p className='text-white pb-10'>Notre site vous emmène à la découverte des plus beaux lieux de la planète. Que vous rêviez de paysages époustouflants, de cultures fascinantes ou de destinations insolites, trouvez l'inspiration pour vos voyages. Explorez le monde et préparez des souvenirs inoubliables.</p>
                    <form className='flex flex-col md:flex-row gap-2'>
                        <TemperatureSearch temperature={temperature} setTemperature={setTemperature} />
                        <Activity activity={activity} setActivity={setActivity} />
                        <TravelDate traveldate={traveldate} setTravelDate={setTravelDate} />
                        <div className="relative">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                                <button
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                    type="submit"
                                    className="mt-1 block w-full pl-10 pr-4 py-3 bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 focus:ring-2 transition-all duration-200"
                                    aria-label="Search"
                                >
                                    {isLoading ? "Searching..." : "Search"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <h2 className='bg-black'>Results</h2>
            <ul className='flex flex-wrap gap-5 justify-center list-style-type: none'>
                {Array.isArray(results) && results.length > 0 ? (
                    results.map((result, index) => (
                        <Destination key={index} destination={result} />
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </ul>
        </div>

    );
}