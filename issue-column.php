<?php

class Issue_Column extends Column{

	protected function display_row( $issue ){
		echo '<div class="number"><span class="pound">#</span>' . $issue->number . '</div>';
		echo '<div class="title">' . $issue->title . '</div>';
	}

}