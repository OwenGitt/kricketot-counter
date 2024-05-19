<?php 

/**
 * BaseEndPoint
 *
 * The baseendpoint class is the baseendpoint for the API which will tell
 * any users who made the api and be the main landing page.
 * 
 * @author Owen Gittins
 */

class baseEndpoint extends Endpoint{

    public function __construct() {

        $name = array(
            "first_name" => "Owen", 
            "last_name" => "Gittins"
        );
        $module = array(
            "code" => "KV6003", 
            "name" => "Individual Computing Project",
            "level" => 6,
            "module_tutor" => "Xiaomin Chen, Effie Le Moignan"
        );
        $data = array(
            "name" => $name,
            "id" => "w19039374",
            "module" => $module,
            "recipes endpoint" => "http://unn-w19039374.newnumyspace.co.uk/year3/banquet/api/recipes"
        );

        $this->setData( array(
            "length"=> count($data),
            "message"=> "Success",
            "data"=> $data
        ));
        
    }

}