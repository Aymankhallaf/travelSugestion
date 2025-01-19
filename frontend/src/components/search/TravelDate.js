import React from 'react';


export function TravelDate({ travelDate, setTravelDate }) {


    return (
        <div className='flex-1 block overflow-hidden bg-white border-gray-200 rounded-lg	px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
            <label htmlFor="travel-date">Select Travel Date: </label>
            <input
                className='mt-1 w-full border-none p-0'
                type="date"
                id="travel-date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
            />
        </div>
    );
}
