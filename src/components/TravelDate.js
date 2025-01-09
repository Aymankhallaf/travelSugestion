import React, { useState } from 'react';

const TravelDate = () => {
    const [date, setDate] = useState('');

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <div>
            <label htmlFor="travel-date">Select Travel Date: </label>
            <input 
                type="date" 
                id="travel-date" 
                value={date} 
                onChange={handleDateChange} 
            />
            <p>Selected Date: {date}</p>
        </div>
    );
};

export default TravelDate;