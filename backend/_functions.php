<?php
require_once('vendor/autoload.php');



$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.content.tripadvisor.com/api/v1/location/search?key=api&searchQuery=swimming&language=en', [
  'headers' => [
    'accept' => 'application/json',
  ],
]);

echo $response->getBody();