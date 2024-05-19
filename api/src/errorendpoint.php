<?php 

/**
 * ErrorEndpoint
 *
 * This class handles the endpoint errors, so if a user enters
 * an incorrect endpoint url a message will be displayed to show
 * that they have entered an incorrect URL.
 *
 * @author Owen Gittins
 */

class errorEndpoint extends Endpoint{

    public function __construct() {
        $this->setData( array(
            "length" => 0,
            "message" => 'There has been an error. Please try again with a correct path. For help visit http://unn-w19039374.newnumyspace.co.uk/year3/banquet/api/',
            "data" => null
        ));
    }

}