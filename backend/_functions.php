<?php



/**
 * Get data from the OpenWeatherMap API
 * 
 * @param string $city
 * @return string
 */
function getTripadvisorData(string $searchQuery)
{
    try {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://api.content.tripadvisor.com/api/v1/location/search?key=' . $_ENV["ApiTripadvisor"] . '&searchQuery=' . $searchQuery . '&language=en', [
            'headers' => [
                'accept' => 'application/json',
            ],
        ]);
        return $response->getBody();
    } catch (\GuzzleHttp\Exception\GuzzleException $e) {
        return $e->getMessage();
    }
}
