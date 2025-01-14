<?php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
//LoggerInterface is a standardized way to handle logging in PHP.
use Psr\Log\LoggerInterface;

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