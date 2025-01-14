<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
//LoggerInterface is a standardized way to handle logging in PHP.
use Psr\Log\LoggerInterface;


/**
 * Get data from the Tripadvisor API.
 *
 * @param string $searchQuery The search query to use.
 * @param LoggerInterface|null $logger Optional PSR-3 logger.
 * @return array|null The decoded JSON response or null on failure.
 */
function getTripadvisorData(string $searchQuery, LoggerInterface $logger = null): ?array
{
    // Validate environment variable
    if (!isset($_ENV["ApiTripadvisor"]) || empty($_ENV["ApiTripadvisor"])) {
        throw new RuntimeException('Tripadvisor API key is not set in environment variables.');
    }

    $client = new Client();
    $queryParams = [
        'key' => $_ENV["ApiTripadvisor"],
        'searchQuery' => $searchQuery,
        'language' => 'en',
    ];

    try {
        $response = $client->request('GET', 'https://api.content.tripadvisor.com/api/v1/location/search', [
            'headers' => [
                'accept' => 'application/json',
            ],
            'query' => $queryParams,
        ]);

        $body = $response->getBody();
        $data = json_decode($body, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException('Failed to decode JSON response.');
        }

        return $data;
    } catch (GuzzleException $e) {
        // Log the error if a logger is provided
        if ($logger !== null) {
            $logger->error('Guzzle HTTP request failed: ' . $e->getMessage(), [
                'searchQuery' => $searchQuery,
                'exception' => $e,
            ]);
        }

        // Optionally rethrow the exception or return null
        return null;
    } catch (RuntimeException $e) {
        // Log the error if a logger is provided
        if ($logger !== null) {
            $logger->error('Runtime error: ' . $e->getMessage(), [
                'searchQuery' => $searchQuery,
                'exception' => $e,
            ]);
        }

        // Optionally rethrow the exception or return null
        return null;
    }
}


/**
 * Get photos from the Tripadvisor API for a specific location.
 *
 * @param string $locationId The location ID to use.
 * @param LoggerInterface|null $logger Optional PSR-3 logger.
 * @return array|null The decoded JSON response or null on failure.
 */
function getTripadvisorPhotos(string $locationId, LoggerInterface $logger = null): ?array
{
    if (!isset($_ENV["ApiTripadvisor"]) || empty($_ENV["ApiTripadvisor"])) {
        throw new RuntimeException('Tripadvisor API key is not set in environment variables.');
    }

    $client = new Client();
    $queryParams = [
        'key' => $_ENV["ApiTripadvisor"],
        'language' => 'en',
    ];

    try {
        $response = $client->request('GET', "https://api.content.tripadvisor.com/api/v1/location/{$locationId}/photos", [
            'headers' => [
                'accept' => 'application/json',
            ],
            'query' => $queryParams,
        ]);

        $body = $response->getBody();
        $data = json_decode($body, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException('Failed to decode JSON response.');
        }

        return $data;
    } catch (GuzzleException $e) {
        if ($logger !== null) {
            $logger->error('Guzzle HTTP request failed: ' . $e->getMessage(), [
                'locationId' => $locationId,
                'exception' => $e,
            ]);
        }
        return null;
    } catch (RuntimeException $e) {
        if ($logger !== null) {
            $logger->error('Runtime error: ' . $e->getMessage(), [
                'locationId' => $locationId,
                'exception' => $e,
            ]);
        }
        return null;
    }
}


/**
 * Get the temperature forecast for a specific city and date.
 *
 * @param string $location The city or location name.
 * @param string $date The date in YYYY-MM-DD format.
 * @param LoggerInterface|null $logger Optional PSR-3 logger.
 * @return array|null The weather forecast or null on failure.
 */
function getCityWeather(string $location, string $date, LoggerInterface $logger = null): ?array
{
    if (!isset($_ENV["WEATHERAPI_KEY"]) || empty($_ENV["WEATHERAPI_KEY"])) {
        throw new RuntimeException('Visual Crossing API key is not set in environment variables.');
    }

    $client = new Client();
    $queryParams = [
        'key' => $_ENV["WEATHERAPI_KEY"],
        'unitGroup' => 'metric',
    ];

    try {
        $response = $client->request('GET', "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{$location}/{$date}", [
            'headers' => [
                'accept' => 'application/json',
            ],
            'query' => $queryParams,
        ]);

        $body = $response->getBody();
        $data = json_decode($body, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException('Failed to decode JSON response.');
        }

        $forecastDay = $data['days'][0]; // First (and only) day in the array

        return [
            'date' => $forecastDay['datetime'],
            'avg_temperature' => $forecastDay['temp'],
            'max_temperature' => $forecastDay['tempmax'],
            'min_temperature' => $forecastDay['tempmin'],
            'conditions' => $forecastDay['conditions'],
            'wind_speed' => $forecastDay['windspeed'],
            'humidity' => $forecastDay['humidity'],
            'chance_of_rain' => $forecastDay['precipprob'],
            'uv_index' => $forecastDay['uvindex'],
            'sunrise' => $forecastDay['sunrise'],
            'sunset' => $forecastDay['sunset'],
            'icon' => $forecastDay['icon'], // Weather icon
        ];
        
    } catch (GuzzleException $e) {
        if ($logger !== null) {
            $logger->error('Visual Crossing request failed: ' . $e->getMessage(), [
                'location' => $location,
                'date' => $date,
                'exception' => $e,
            ]);
        }
        return null;
    } catch (RuntimeException $e) {
        if ($logger !== null) {
            $logger->error('Runtime error: ' . $e->getMessage(), [
                'location' => $location,
                'date' => $date,
                'exception' => $e,
            ]);
        }
        return null;
    }
}



/**
 * purify data by removing strip tags for data and if 
 * the input data have a article paragraph he will allow some
 * html character look at config of this function (purifierHtmlText())
 * @param array $inputData the data input
 * @return void
 */
function purifyData(array $inputData): void
{
    foreach ($inputData as $key => &$value) {
        if (is_int($value)) {
            intval($value);
        } elseif (is_null($value)) {
            $value = null;
        } elseif (is_array($value)) {
            purifyData($value);
        } else {
            // Strip all tags and escape for other fields
            $value = htmlspecialchars(strip_tags($value));
        }
    }
}
