<?php

class User_Column extends Issue_Column{

	protected $base_class = 'user column';

	protected $avatar;

	public function __construct( $user, $avatar ){
		parent::__construct( $user );
		$this->avatar = $avatar;
	}
	
	protected function display_header(){
		echo '<div class="' . $this->header_class . '" style="background-color: ' . $this->color . ';">';
		echo '<div class="title">';

				echo '<img src="' . $this->avatar . '">';
				echo '<span class="name">' . $this->title . '</span>';

		echo '</div>';
		echo '</div>';
	}

}