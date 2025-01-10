export const fetchDestinations = async (activity) => {
    const apiKey = '';
    const url = `https://api.tripadvisor.com/api/partner/2.0/location/${activity}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch destinations');
    }
    const data = await response.json();
    return data;
};