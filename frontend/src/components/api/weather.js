export const fetchWeather = async (city, date) => {
    const apiKey = '';
    const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch destinations');
    }
    const data = await response.json();
    return data;
  };