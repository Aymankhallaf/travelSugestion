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
        // <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        //     <h3>{city}</h3>
        //     <p><strong>Temperature:</strong> {currentTemp}°C (Min: {minTemp}°C, Max: {maxTemp}°C)</p>
        //     <div>
        //         <strong>Photos:</strong>
        //         {photos && photos.data && photos.data.length > 0 ? (
        //             photos.data.map((photo, index) => (
        //                 <img
        //                     key={index}
        //                     src={photo.images.original.url}
        //                     alt={`${index + 1}`}
        //                     style={{ width: '100px', margin: '5px' }}
        //                 />
        //             ))
        //         ) : (
        //             <p>No photos available.</p>
        //         )}
        //     </div>
        // </div>
        <li key={destination.id}>
            <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                    {photos && photos.data && photos.data.length > 0 ? (
                        <img
                            key={0}
                            src={photos.data[0].images.original.url}
                            alt="1"
                            style={{ width: '100px', margin: '5px' }}
                        />
                    ) : (
                        <p>No photos available.</p>
                    )}             </div>
                <div class="p-4">
                    <div class="flex items-center mb-2">
                        <h3 class="text-slate-800 text-xl font-semibold">
                            {city}
                        </h3>

                        <div class="flex items-center gap-0 5 ml-auto">
                            <FaTemperatureHalf />
                            <span class="text-slate-600 ml-1.5">{currentTemp}°C (Min: {minTemp}°C, Max: {maxTemp}°C)°C</span>
                        </div>
                    </div>

                    <p class="text-slate-600 leading-normal font-light">
                        Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.
                    </p>
                </div>


            </div>

        </li>
    );
}