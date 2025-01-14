import React from 'react';

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
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>{city}</h3>
            <p><strong>Temperature:</strong> {currentTemp}°C (Min: {minTemp}°C, Max: {maxTemp}°C)</p>
            <div>
                <strong>Photos:</strong>
                {photos && photos.data && photos.data.length > 0 ? (
                    photos.data.map((photo, index) => (
                        <img
                            key={index}
                            src={photo.images.original.url}
                            alt={`Photo ${index + 1}`}
                            style={{ width: '100px', margin: '5px' }}
                        />
                    ))
                ) : (
                    <p>No photos available.</p>
                )}
            </div>
        </div>
    );
}