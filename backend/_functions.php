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
