<?php

abstract class Column{

	public $title = '';
	public $color = '#CCCCCC';
	public $rows = array();

	protected $base_class = 'column';
	protected $header_class = 'column-header';
	protected $item_class = 'item';

	public function add_row( $row ){
		$this->rows[] = $row;
	}

	public function display(){

		echo '<div class="column">';
		$this->display_header();
		$this->display_rows();
		echo '</div>';

	}

	protected function display_header(){
		echo '<div class="' . $this->header_class . '" style="background-color: ' . $this->color . ';">';
		echo $this->title;
		echo '</div>';
	}

	protected function display_rows(){

		foreach( $this->rows as $row ){
			echo '<div class="issue">';
			$this->display_row( $row );
			echo '</div>';
		}

	}

	protected abstract function display_row( $row );

}