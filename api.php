<?php

include_once 'github.php';

use GitHub\API\Authentication;
use GitHub\API\Repo\Issue;
use GitHub\API\AuthenticationException;

include_once 'config.php';
include_once 'lib.php';


// Lets access the User API
$issues = new Issue();
$issues->setCredentials( new Authentication\Basic( GITHUB_USER_NAME, GITHUB_USER_PASS));
$issues->login();

if( empty($_GET['page']) ){
	$page = 1;
}else{
	$page = intval($_GET['page']);
}

$per_page = 100;

$issues = json_decode($issues->all("AppThemes", "Vantage", array(), array( 'sort' => 'updated' ), $page, $per_page ));

$output = array(
	"page" => $page,
	"per_page" => $per_page,
	"issues" => $issues
);

echo json_encode($output);