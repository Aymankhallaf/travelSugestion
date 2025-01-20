import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';


export function TravelDate({ travelDate, setTravelDate }) {


    return (
        <div className="flex-1 relative">
            <label htmlFor="travel-date" className="sr-only">
                Travel Date
            </label>
            <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="date"
                    id="travel-date"
                    className="mt-1 block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    aria-label="Travel Date"
                />
            </div>
        </div>
    );
}
