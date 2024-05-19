<?php
/**
 * Exception Handler
 *
 * This class handles any exceptions that may appear. Returning an
 * http response code of 500 while outputing a message and the location
 * that the exception occured.
 *
 * @author Owen Gittins
 */

 function exceptionHandler($e) {
    http_response_code(500);
    $output['message'] = $e->getMessage();
    $output['location']['file'] = $e->getFile();
    $output['location']['line'] = $e->getLine();
    echo json_encode($output);
    exit();
}