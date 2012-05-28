<?php

class Section{
	
	public $title = '';
	public $columns = array();

	protected $base_class = 'section';
	protected $header_class = 'section-header';
	protected $list_class = 'list';

	public function __construct( $title = '', array $columns = array() ){
		$this->title = $title;
		$this->columns = $columns;
	}

	public function add_column( Column $column ){

		$this->columns[] = $column;

	}

	public function display(){

		echo '<div class="' . $this->base_class . '">';
		$this->display_header();
		$this->display_columns();
		echo '</div>';

	}

	protected function display_header(){

		echo '<div class="' . $this->header_class . '">';
		echo $this->title;
		echo '</div>';

	}

	protected function display_columns(){

		echo '<div class="' . $this->list_class . '">';
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