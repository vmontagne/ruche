<?php
/**
 * Created by PhpStorm.
 * User: valentin
 * Date: 29/12/16
 * Time: 17:21
 */

require_once 'RucheDB.php';

//On instancie notre objet
$ruche = new RucheDB();

//on récupère les données en BD et on les encode en json et on les écrit sur la sortie standard => réponse
echo json_encode($ruche->getData());

//on quitte
exit;