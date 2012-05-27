<?php 

	class Column{

		public $title = '';
		public $color = '#CCCCCC';
		public $issues = array();

		public function add_issue( $issue ){
			$this->issues[] = $issue;
		}

		public function display(){

			echo '<div class="column">';
			$this->display_header();
			$this->display_issues();
			echo '</div>';

		}

		public function display_header(){
			echo '<div class="column-header" style="background-color: ' . $this->color . ';">';
			echo $this->title;
			echo '</div>';
		}

		public function display_issues(){

			foreach( $this->issues as $issue ){
				echo '<div class="issue">';
				echo '<div class="number"><span class="pound">#</span>' . $issue->number . '</div>';
				echo '<div class="title">' . $issue->title . '</div>';
				echo '</div>';
			}

		}

	}

	class Section{

		public $title = '';
		public $columns = array();

		public function add_column( Column $column ){
			$this->columns[] = $column;
		}

		public function display(){

			echo '<div class="milestone">';
			$this->display_header();
			$this->display_columns();
			echo '</div>';

		}

		public function display_header(){
			echo '<div class="milestone-header">';
			echo $this->title;
			echo '</div>';
		}

		public function display_columns(){
			echo '<div class="issues">';
			foreach( $this->columns as $key => $column ){
				$column->display();
				if( ( $key + 1 ) % 3 == 0){
					echo '<div class="clr">&nbsp;</div>';
				}
			}
			echo '<div class="clr">&nbsp;</div>';
			echo '</div>';
		}


	}

include_once 'github.php';

use GitHub\API\Authentication;
use GitHub\API\Repo\Issue;
use GitHub\API\AuthenticationException;

include_once 'config.php';

// Lets access the User API
$issues = new Issue();
$issues->setCredentials( new Authentication\Basic( GITHUB_USER_NAME, GITHUB_USER_PASS));
$issues->login();

$milestone = new Section();
$milestone->title = "First Milestone";

$unlabeled = new Column;
$unlabeled->title = "Unlabeled";

$columns = array(
);

$all = $issues->all("AppThemes", "Vantage", array(), array( 'sort' => 'updated' ), 1, 100 );
$all = json_decode($all);
foreach( $all as $issue ){
	if( count($issue->labels) == 0 ){
		$unlabeled->add_issue($issue);
	}

	foreach( $issue->labels as $label ){
		if( !isset($columns[$label->name])){
			$new = new Column();
			$new->title = $label->name;
			$new->color = $label->color;
			$columns[$label->name] = $new;
		}

		$columns[$label->name]->add_issue( $issue );
	}
}

foreach( $columns as $column )
	$milestone->add_column($column);

$milestone->add_column($unlabeled);


?>
<html>
	<head>
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<div class="container">
			<?php $milestone->display(); ?>
	</body>
</html>