import React from 'react';
import { FaTemperatureHalf } from "react-icons/fa6";

export function Destination({ destination }) {
    // Ensure destination is defined
    if (!destination) {
        return <p>No destination data available.</p>;
    }

    // Extract data from the destination object
    const { city, temperature, photos } = destination;

    // Extract temperature values
    const currentTemp = temperature?.current || 'N/A';
    const minTemp = temperature?.min || 'N/A';
    const maxTemp = temperature?.max || 'N/A';

    return (
        <li key={destination.id}>
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                    {photos && photos.data && photos.data.length > 0 ? (
                        <img
                            className='object-cover w-full h-full'
                            key={0}
                            src={photos.data[0].images.original.url}
                            alt="1"
                        />
                    ) : (
                        <p>No photos available.</p>
                    )}             </div>
                <div className="p-4">
                    <div className="flex flex-col justify-items-start mb-2">
                        <h3 className="text-slate-800 text-xl font-semibold text-nowrap mb-2">
                            {city}

                        </h3>

                        <div className="flex gap-2 items-center">
                            <FaTemperatureHalf />
                            <span className="text-slate-600 ml-2">{currentTemp}°C (Min: {minTemp}°C, Max: {maxTemp}°C)°C</span>
                        </div>
                    </div>

                    <p className="text-slate-600 leading-normal font-light">
                    </p>
                </div>


            </div>

        </li>
    );
}