<?php

/**
 * Created by PhpStorm.
 * User: valentin
 * Date: 29/12/16
 * Time: 17:26
 */
class RucheDB
{

    //Correspond à la BD
    private $db;

    //Poids intial d'une ruche
    const INITIAL_WEIGHT = 0;

    public function __construct()
    {
        //on instancie la connection à la BD (permet de mtualiser pour toutes les requêtes
        $this->db = new PDO('mysql:host=localhost;dbname=ruche;charset=utf8', 'ruche', 'Pb45Fh4vB');
    }

    /**
     * Permet de faire les requête à la BD et de formater les données correctement
     *
     * @return array contient l'ensemble des données à rendre
     */
    public function getData(){
        //tableau contenant les données finales
        $data = [];

        //Récupération des données style météo
        $data['measure'] = $this->getCurrentMeasure();
        //Récupération des données style courbes
        $data['graphs'] = [];
        $data['graphs']['month'] = $this->getHistoryMonthData();
        $data['graphs']['day'] = $this->getHistoryDayData();

        return $data;
    }

    /**
     * Permet de récupérer les données style météo
     *
     * @return mixed
     */
    public function getCurrentMeasure() {
        //Requête SQL à éxécuter
        $query = 'SELECT date, poids, temp_ext, humidite, temp_int, pression_ath, luminosite, intensite, tension  FROM data 
                  ORDER BY date DESC
                  LIMIT 1;';

        //On éxécute la requête
        //TODO: vérifier qu'il y a bien des données avant de fetch
        $results = $this->db->query($query)->fetch();

        //inutile...
        $row = $results;

        //On enlève le poids à vide initial de la ruche
        $row['poids'] = $row['poids'];

        return $row;

    }

    /**
     * Permet de récupérer les données pour faire des graphes
     *
     * @return array
     */
    public function getHistoryMonthData() {
        //Requête à exécuter
        $query = 'SELECT date, poids, temp_ext, humidite, temp_int, pression_ath, luminosite, intensite, tension
         FROM data
	 WHERE date > (NOW() - INTERVAL 3 MONTH) AND hour(date) = 12
	 GROUP BY year(date), month(date), day(date);';

        //on exécute la requête
        $results = $this->db->query($query);

        //On initialise les tableau qui vont contenir les datas finales
	$datas = [];
        $poids = [];
         $temps_ext = [];

        //On parcour les lignes récupérerée
        //TODO: vérifier que la requête c'est bien passée avant de faire ca...
        foreach($results->fetchAll() as $row) {
            //On convertie la date en objet pour faciliter le reformatage
            //Les tableau vont être indixé via des timestamp
	    $date = new \DateTime($row['date']);

            //on intègre les données dans les différents tableau...
            $poids[$date->format('U')] = $row['poids'];
            $temps_ext[$date->format('U')] = $row['temp_ext'];
	    $datas[] = [
		    'date' => $date->format('c'),
		    'poids' => $row['poids'],
		    'temp_ext' => $row['temp_ext'],
	    ];
        }

        //on retourne les donénes.
        //return array(
        //    'poids' => $poids,
        //    'temp_ext' => $temps_ext,
	//);
	return $datas;
    }

    /**
     * Permet de récupérer les données pour faire des graphes
     *
     * @return array
     */
    public function getHistoryDayData() {
        //Requête à exécuter
        $query = 'SELECT date, poids, temp_ext, humidite, temp_int, pression_ath, luminosite, intensite, tension
         FROM data
	 WHERE date > (NOW() - INTERVAL 1 DAY) AND minute(date) < 10 
	 GROUP BY year(date), month(date), day(date), hour(date)
	 ORDER BY date;';

        //on exécute la requête
        $results = $this->db->query($query);

        //On initialise les tableau qui vont contenir les datas finales
	$datas = [];
        $poids = [];
         $temps_ext = [];

        //On parcour les lignes récupérerée
        //TODO: vérifier que la requête c'est bien passée avant de faire ca...
        foreach($results->fetchAll() as $row) {
            //On convertie la date en objet pour faciliter le reformatage
            //Les tableau vont être indixé via des timestamp
	    $date = new \DateTime($row['date']);

            //on intègre les données dans les différents tableau...
            $poids[$date->format('U')] = $row['poids'];
            $temps_ext[$date->format('U')] = $row['temp_ext'];
	    $datas[] = [
		    'date' => $date->format('c'),
		    'poids' => $row['poids'],
		    'temp_ext' => $row['temp_ext'],
	    ];
        }

        //on retourne les donénes.
        //return array(
        //    'poids' => $poids,
        //    'temp_ext' => $temps_ext,
	//);
	return $datas;
    }
}
