<?php

/**
 * General Endpoint, used to structure all responses from the database
 * 
 * 
 * @author Owen Gittins
 */

abstract class Endpoint{

    private $data;
    private $sql;
    private $params;

    public function __construct(){

        $db = new Database("db/pokemondb.db");
        $this->initialiseSQL();
        // Check if the params used are valid for endpoint
        $this->validateParams($this->endpointParams());
        $data = $db->executeSQL($this->sql, $this->params);

        $this->setData( array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }

    protected function getSQL(){
        return $this->sql;
    }

    protected function setSQL($sql){
        $this->sql = $sql;
    }

    protected function getSQLParams(){
        return $this->params;
    }

    protected function setSQLParams($params){
        $this->params = $params;
    }

    public function getData(){
        return $this->data;
    }

    protected function setData($data){
        $this->data = $data;
    }

    protected function initialiseSQL(){
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }

    protected function endpointParams(){
        return [];
    }

    protected function validateParams($params){
        foreach($_GET as $key => $value){
            if(!in_array($key, $params)){
                http_response_code(400);
                $output['message'] = "Invalid Parameter: " . $key;
                die(json_encode($output));
            }
        }
    }
}