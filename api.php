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

echo $issues->all("AppThemes", "Vantage", array(), array( 'sort' => 'updated' ), 1, 100 );