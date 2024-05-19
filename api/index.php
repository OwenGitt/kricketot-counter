<?php
include 'config/config.php'; 
$theResponse= new Response();

define('DEVELOPMENT_MODE', true);
ini_set('display_errors', DEVELOPMENT_MODE);
ini_set('display_startup_errors', DEVELOPMENT_MODE);

$request = new Request();

switch($request->getPath()) {
    case '/':
        $endpoint = new BaseEndPoint($request);
        break;
    case '/pokemon/':
    case '/pokemon':
        $endpoint = new Pokemon($request);
        break;
    default:
        $endpoint = new errorEndpoint($request);
        
}

$response = $endpoint->getData();
echo json_encode($response);