import React from 'react';


export function TravelDate({ travelDate, setTravelDate }) {


    return (
        <div>
            <label htmlFor="travel-date">Select Travel Date: </label>
            <input
                type="date"
                id="travel-date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
            />
            <p>Selected Date: {travelDate}</p>
        </div>
    );
}
