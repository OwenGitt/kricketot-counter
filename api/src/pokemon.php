<?php

/**
 * Pokemon endpoint
 *
 * 
 * @author Owen Gittins
 */

class Pokemon extends Endpoint{

    protected function endpointParams() {
        return ['pokemonid'];
     }

    protected function initialiseSQL(){
        try {
            $filter=False;
            //Select the database to query
            $db = new Database("db/pokemondb.db");
            //Create the SQL query
            $sql = "SELECT * 
                    FROM pokemon";

            $params = [];

            //Set the endpoint parameters that can be accepted
            $this->validateParams($this->endpointParams());
            
            //If the pokemonid parameter is in the sent fetch request URL then filter by the pokemonid in the SQL query
            if (filter_has_var(INPUT_GET, 'pokemonid')) {
                if (!filter_var($_GET['pokemonid'],FILTER_VALIDATE_INT)) {
                    http_response_code(400);
                    $output['message'] = "Value of pokemonid must be a integer.";
                    die(json_encode($output));
                } else {
                    $sql .= " WHERE pokemonid = :pokemonid ";
                    $params[':pokemonid'] = $_GET['pokemonid'];
                    $filter=True;
                }
            }

            //Set the sql to be used in the database query and the parameters
            $this->setSQL($sql);
            $this->setSQLParams($params);
        } catch (BadRequest $e) {
            $this->data = ["message" => $e->badRequestMessage()];
        }
    }

}

