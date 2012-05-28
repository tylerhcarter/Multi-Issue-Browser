<?php 

include_once 'github.php';

use GitHub\API\Authentication;
use GitHub\API\Repo\Issue;
use GitHub\API\AuthenticationException;

include_once 'config.php';
include_once 'lib.php';

include 'view/column.php';
include 'view/section.php';

include 'milestone.php';
include 'issue-column.php';
include 'user-column.php';
include 'label-column.php';

// Lets access the User API
$issues = new Issue();
$issues->setCredentials( new Authentication\Basic( GITHUB_USER_NAME, GITHUB_USER_PASS));
$issues->login();

$id = 8;

$grab = array(
	8 => "1.1",
	7 => "1.0.1",
);

foreach( $grab as $id => $title ){

	$milestone = new Milestone();
	$milestone->title = $title;

	fill_milestone( $issues, $milestone, $id );

	$milestones[] = $milestone;
}

function fill_milestone( $issues, $milestone, $id ){

	$all = $issues->all("AppThemes", "Vantage", array( 'milestone' => $id ), array( 'sort' => 'updated' ), 1, 100 );
	$all = json_decode($all);

	if( empty($_GET['type']) || !in_array( $_GET['type'], array( 'user', 'label' ) ))
		$type = 'user';
	else
		$type = $_GET['type'];

	switch( $type ){

		case 'user':
			sort_by_user( $all, $milestone );
			break;
		case 'label':
			sort_by_label( $all, $milestone );
			break;

	}

}

function sort_by_label( $issues, $milestone ){

	$unlabeled = new Label_Column( 'Unlabeled' );

	$columns = array();
	foreach( $issues as $issue ){

		if( count($issue->labels) == 0 )
			$unlabeled->add_row($issue);

		foreach( $issue->labels as $label ){
			if( !isset($columns[$label->name])){

				$columns[$label->name] = new Label_Column( $label->name, $label->color );
				$milestone->add_column( $columns[$label->name] );

			}

			$columns[$label->name]->add_row( $issue );
		}
	}	

	$milestone->add_column($unlabeled);

}

function sort_by_user( $issues, $milestone ){

	$unassigned = new User_Column( 'Unassigned', '' );

	$columns = array();
	foreach( $issues as $issue ){

		if( empty( $issue->assignee ) ){
			$unassigned->add_row($issue);
			continue;
		}

		$assignee = $issue->assignee;
		$name = $assignee->login;

		if( !isset( $columns[$name] ) ){

			$columns[$name] = new User_Column( $name, $assignee->avatar_url );
			$milestone->add_column( $columns[$name] );

		}
		
		$columns[$name]->add_row( $issue );
	}	

	$milestone->add_column($unassigned);

}

?>
<html>
	<head>
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<div class="container">
			<?php foreach( $milestones as $milestone )
				$milestone->display();
			?>
		</div>
		<div class="info-bar">
			<div class="content">
			<?php 
			$headers = $issues->getTransport()->getJournal()->getLast()->getResponse()->getHeaders();
			$rate_limit = get_header( 'X-RateLimit-Remaining', $headers );
			?>
			Rate Limit: <?php echo $rate_limit . "/5000"; ?>
			-
			Sort By: <a href="?type=label">Label</a> - <a href="?type=user">User</a>
			</div>
		</div>
	</body>
</html>