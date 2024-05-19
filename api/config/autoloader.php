<?php
/**
 * Autoloader
 *
 * This class allows any file to be auto loaded and is used by index.php
 * to save having to code 'include' a file every time it is required.
 *
 * @author Owen Gittins
 */

class Autoload
{
    public static function autoloader($className) {
        $filename = "src\\" . strtolower($className) . ".php";
        $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
        if (is_readable($filename)) {
            include_once $filename;
        } else {
            throw new exception("File not found: " . $className . " (" . $filename . ")");
        }
    }
}