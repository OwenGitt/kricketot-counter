<?php

/**
 * Error Handler
 *
 * This class handles any errors that appear and will throw an exception.
 * It will set the output and give the Exception class the errstring to display.
 *
 * @author Owen Gittins
 */

function errorHandler($errno, $errstr, $errfile, $errline) {
    if($errno !== 8 && $errno !== 2) {
		$output['error']['number'] = $errno;
		$output['error']['message'] = $errstr;
		$output['error']['fie'] = $errfile;
		$output['error']['line'] = $errline;
            throw new Exception($errstr);
    }
	die();
}