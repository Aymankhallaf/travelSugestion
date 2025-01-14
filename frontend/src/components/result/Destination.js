import React from 'react';

export function Destination({ destination }) {
    // Ensure destination is defined
    if (!destination) {
        return <p>No destination data available.</p>;
    }

    // Extract data from the destination object
    const { city, temperature, photos } = destination;

    return (
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>{city}</h3>
            <p><strong>Temperature:</strong> {temperature}°C</p>
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