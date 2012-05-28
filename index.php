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

// Lets access the User API
$issues = new Issue();
$issues->setCredentials( new Authentication\Basic( GITHUB_USER_NAME, GITHUB_USER_PASS));
$issues->login();

$grab = array(
	8 => "1.1",
);

foreach( $grab as $id => $title ){

	$milestone = new Milestone();
	$milestone->title = "Vantage " . $title;

	fill_milestone( $issues, $milestone, $id );

	$milestones[] = $milestone;
}

function fill_milestone( $issues, $milestone, $id ){

	$unlabeled = new Issue_Column;
	$unlabeled->title = "Unlabeled";

	$columns = array(
	);

	$all = $issues->all("AppThemes", "Vantage", array( 'milestone' => $id ), array( 'sort' => 'updated' ), 1, 100 );
	$all = json_decode($all);
	foreach( $all as $issue ){
		if( count($issue->labels) == 0 ){
			$unlabeled->add_row($issue);
		}

		foreach( $issue->labels as $label ){
			if( !isset($columns[$label->name])){
				$new = new Issue_Column();
				$new->title = $label->name;
				$new->color = $label->color;
				$columns[$label->name] = $new;
			}

			$columns[$label->name]->add_row( $issue );
		}
	}

	foreach( $columns as $column )
		$milestone->add_column($column);

	$milestone->add_column($unlabeled);

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
			</div>
		</div>
	</body>
</html>