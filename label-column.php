<?php

class Label_Column extends Issue_Column{

	protected $base_class = 'label column';
	
	protected function display_header(){
		echo '<div class="' . $this->header_class . '" style="background-color: ' . $this->color . ';">';
		echo '<div class="title">';

				echo '<span class="name">' . $this->title . '</span>';

		echo '</div>';
		echo '</div>';
	}

}